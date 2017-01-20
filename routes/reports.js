var express = require('express');
var router = express.Router();

// view
var reports = require('../views/finance/reports.marko');
// Colors on console.log
var colors = require('colors');


// Page view
router.get('/', function (req,res,next){
  var email = req.user.email;
  var db = res.locals.db;

  // Database call to get the years with transactions in it
  db.collection('transactions').aggregate([
  {
    $match: {
      user: email
    }
  },
  {
    $group: {
      _id: {$year: '$date'}
    }
  },
  {
    $project: {
      _id: 0,
      date: '$_id'
    }
  },
  {
    $sort: {
      date: -1
    }
  }
  ], function (err, years){
    if (err) throw err;

    console.log('year', years);
    
    // Render the page
    reports.render({
      title: 'reports',
      years: years
    }, res);

  }); // years aggregate
});

// Get expense/income from DB and export reports
router.get('/get-stats', function (req,res,next){
  // DB object
  var db = res.locals.db;
  var email = req.user.email;

  // Get real only or real+fake
  console.log('req query params: ', req.query);
  if ('q' in req.query && req.query.q == 'real')
    var type = ['real'];
  else
    var type = ['real','fake'];

  // Aggregate to find income and expenses
  db.collection('transactions').aggregate([
  // Match to find only real/fake eventually
  {
    $match: {
      user: email,
      date: {
        $gte: new Date(req.query.y,0,1),
        $lte: new Date(req.query.y,11,31),
      },
      type: {$in: type}
    }
  }, 
  {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category_lookup"
    }
  },
  {
    // Write if it's income or expense, useful to $group in next pipeline
    $project: {
      type: {
        $cond: {
          if: {$gte: ["$amount", 0]},
          then: "income",
          else: "expense"
        }
      },
      amount: {
        $cond: {
          // If amount is positive then keep that as the amount
          if : {$gte: ["$amount", 0]},
          then: "$amount",
          // Else the amount will be $amount*$detractionFactor (quanto e' detraibile ciascuna spesa)
          else: {
            // sul $category_lookup.detractionAmount, essendo un oggetto preso dal lookup mi restituisce un array di un elemento, quindi per avere il solo numero da poter usare con il multiply, devo usare prima il $sum per sommare tra loro tutti gli elementi dell'array
            $multiply: ["$amount", {$sum: "$category_lookup.detractionAmount"}]}
          }
      },
      cashout: {
        $cond: {
          if : {
            // Check if is expense or income
            $gte: ["$amount", 0]
          },
          then: 0,
          else: {
            // Check if it's shared
            $cond: {
              if: {$gt: ["$shared.paidByMe", 0]},
              // If shared, use my personal cashout as the base expense
              then: {$multiply: ["$shared.paidByMe",{$sum: "$category_lookup.detractionAmount"}]},
              else: {$multiply: [{$abs: "$amount"},{$sum: "$category_lookup.detractionAmount"}]}
            }
          }
        }
      }
    }
  },
  {
    // This way i will have 2 records: one for the expenses, one for the incomes
    $group: {
      _id: "$type",
      // Sum the incomes and expenses
      amount: {$sum: "$amount"},
      // Cashout will be 0 for the income $type
      cashout: {$sum: "$cashout"}
    }
  },
  {
    // Place the expense on top
    $sort: {
      _id: 1
    }
  }
  ], function (err, result){
    if (err) throw err;
    console.log('db report', result);

    // If there are no records
    if (result.length === 0){
      return res.json({
        error: 'No results found'
      });
    }

    // Do all the calculations
    // find the income
    var income = 0;
    var expense = 0;
    var cashout = 0;
    for (var i=0; i<result.length; i++){
      if (result[i]._id === 'income'){
        income = result[i].amount;
      }else{
        expense = Math.abs(result[0].amount);
        cashout = result[0].cashout;
      }
    }

    var stdSummary = calculate(income, expense);
    var cashoutSummary = calculate(income, cashout);

    // Il risparmio e' nella differenza dei costi, non del reddito, perche' le spese nei due casi sono molto diverse
    var risparmio = (cashoutSummary.imposte+cashoutSummary.inpsAddizionale) - (stdSummary.imposte+stdSummary.inpsAddizionale);

    res.json({
      stdSummary: stdSummary,
      cashoutSummary: cashoutSummary,
      risparmio: risparmio
    });

  })
});

function calculate(income,expense){
  var baseImponibile = income-expense;
  // Costi
  var inpsAddizionale = (baseImponibile > 15000) ? (baseImponibile-15000)*0.25 : 0;
  var imposte = baseImponibile * 0.05;
  // Reddito netto
  var redditoNetto = income-expense-inpsAddizionale-imposte;

  return {
    incassi: income,
    spese: expense,
    baseImponibile: baseImponibile,
    inpsAddizionale: inpsAddizionale,
    imposte: imposte,
    redditoNetto: redditoNetto
  }
}

router.get('/maxExpense', function (req, res, next){
  var user = req.user.email;
  var db = res.locals.db;

  var year = new Date().getFullYear();

  // prendo le spese dei beni strumentali degli ultimi 3 anni
  db.collection('transactions').aggregate([
  {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category_lookup"
    }
  },
  {
    $project: {
      beneStrumentale: "$category_lookup.beneStrumentale",
      date: 1,
      amount: 1,
      user: 1,
      type: 1
    }
  },
  {
    $match: {
      date: {
        $gte: new Date(year-2,0,1),
        $lte: new Date(year,11,31)
      },
      user: user,
      amount: {
        $lt: 0
      },
      beneStrumentale: {
        $in: [true]
      }
    }
  },
  {
    $group: {
      _id: "$type",
      total: {
        $sum: "$amount"
      }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
  ], function (err, trans){
    if (err) throw err;
    res.json(trans)
    console.log('transactions found', trans);
  })
})

module.exports = router;