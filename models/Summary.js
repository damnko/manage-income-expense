var getResults = {
  getMeans: function(email, year, callback){
    // DB object
    var db = require('../config/db').getDb();
    
    // DB find expense summary for selected period
    db.collection('transactions').aggregate([
    {
      $match: {
        date: {
          $gte: new Date(year,0,1),
          $lte: new Date(year,11,31),
        },
        user: email
      }
    },
    {
      // Voglio groupare per tipo di transazione (real/fake) e metto tutte le transazioni in un array
      // avrei anche potuto usare il semplice find() in questo caso, invece del aggregate
      $group: {
        _id: "$type",
        amounts: {
          $push: {
            amount: "$amount",
            shared: "$shared"
          }
        }
      }
    }
    ], function (err, result){
      if (err) throw err;

      // I have the aggregate but need to refactor it to show the summary
      // Reset resultObj
      var resultObj = {
          real: {
              income: 0,
              expense: 0,
              cashOut: 0
          },
          fake: {
              income: 0,
              expense: 0,
              cashOut: 0
          }
      }

      // Find the income, expense and cashout
      for (transactionType in resultObj){
        var target = resultObj[transactionType];

        // Get the amounts for real/fake transactions
        var amounts = result.filter(function (result){
          return result._id === transactionType;
        });
        if (amounts.length > 0){
          amounts = amounts[0].amounts;
        }else{
          amounts = [];
        }

        // Get the income
        var income = amounts.filter(function (result){
          return result.amount > 0
        })
        // have to check if income is not empty, if empty empty.reduce gives error
        if (income.length > 0){
          income = income.reduce(function (prev,curr){
            var obj = {
              amount: 0
            }
            obj.amount = prev.amount+curr.amount;
            return obj;
          }).amount;
        }else{
          income = 0;
        }

        // Get the expense and cashout
        var expense = amounts.filter(function (result){
          return result.amount < 0
        })
        var expenseAmount = 0;
        var cashOut = 0;
        expense.forEach(function (result){
          expenseAmount += result.amount;
          if (result.shared.name !== '')
            cashOut -= result.shared.paidByMe;
          else
            cashOut += result.amount;
        });

        // Update the result obj
        target.income = income;
        target.expense = expenseAmount;
        target.cashOut = cashOut;

        // Debug
        console.log('###########');
        console.log('transactionType', transactionType);
        console.log('amounts', amounts);
        console.log('income', income);
        console.log('expense', expenseAmount);
        console.log('cashOut', cashOut);
        console.log('###########');

      }
      callback(null,resultObj);
    });
  },
  getAll: function(email,year,limit,page,callback){
    // DB object
    var db = require('../config/db').getDb();

    console.log('### skip', page*limit);
    console.log('### limit', limit);

    db.collection('transactions').aggregate([
      {$match:
        {
          date: {
            $gte: new Date(year,0,1),
            $lte: new Date(year,11,31)
          },
          user: email
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
        $project: {
          _id: 1,
          amount: 1,
          category: '$category_lookup.name',
          date: 1,
          description: 1,
          type: 1,
          shared: 1
        }
      },
      {
        $sort: {
          date: -1
        }
      },
      {
        $skip: page*limit
      },
      {
        $limit: limit
      },
    ], function (err, result){
      if (err) throw err;
      console.log('aggreate result', result);
      callback(null, result);
    });
  },
  getCount: function(email,year,callback){
    // DB object
    var db = require('../config/db').getDb();

    db.collection('transactions').count({
      date: {
        $gte: new Date(year,0,1),
        $lte: new Date(year,11,31)
      },
      user: email
    }, function (err,count){
      if (err) throw err;
      callback(null, count);  
    });
  }
}

module.exports = getResults;