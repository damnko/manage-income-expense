var express = require('express');
var router = express.Router();

// view
var edit = require('../views/finance/edit.marko');
// Summary controller
var getResults = require('../models/Summary.js');

// Colors on console.log
var colors = require('colors');
// Async utility
var async = require('async');

var ObjectID = require('mongodb').ObjectID;


/* GET users listing. */
router.get('/', function(req, res, next) {

  var email = req.user.email;

  console.log('user is', req.user);

  // DB object
  var db = require('../config/db').db;

  // Database call to get the sharers list
  db.collection('categories').find({},{name:1}).toArray(function (err,categories){
    if (err) throw err;
    // Database call to get the sharers list
    db.collection('sharers').find({user: email},{name:1}).toArray(function (err,sharers){
      if (err) throw err;

      console.log('categories', categories);
      console.log('sharers', sharers);

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
        edit.render({
          title: 'finance',
          categories: categories,
          sharers: sharers,
          years: years,
          isAuth: res.locals.isAuth
        }, res);

      }); // years aggregate
    }); // sharers
  }); // categories
});

// Handle return results
router.get('/get-results', function (req,res,next){

  var email = req.user.email;

  // DB object
  var db = require('../config/db').db;

  var year = parseInt(req.query.year);
  var limit = parseInt(req.query.nr);
  console.log('params', req.query);
  console.log('year', req.query.year);
  console.log('date lookup', new Date(req.query.year + '/01/01').toISOString());

  // DB find with lookup to show detailed results
  var detailedResults;
  
  async.parallel([
    async.apply(getResults.getMeans,email,year),
    async.apply(getResults.getAll,email,year,limit,0),
    async.apply(getResults.getCount,email,year)
  ], function(err, mess){
    var realMean = mess[0].real;
    var fakeMean = mess[0].fake;
    var mean = {
      income: mess[0].real.income + mess[0].fake.income,
      expense: mess[0].real.expense + mess[0].fake.expense,
      cashOut: mess[0].real.cashOut + mess[0].fake.cashOut
    }
    res.json({
      means: {
        real: realMean,
        fake: fakeMean,
        realFake: mean,  
      },
      transactions: mess[1],
      count: mess[2]
    })
  });
});

// Handle change page
router.get('/change-page', function (req,res,next){
  var email = req.user.email;

  // DB object
  var db = require('../config/db').db;

  var year = parseInt(req.query.year);
  var limit = parseInt(req.query.nr);
  var page = parseInt(req.query.page)-1;

  getResults.getAll(email,year,limit,page, function (err,transactions){
    if (err) throw err;
    res.json({
      transactions: transactions
    });
  });
});

// Handle income add
router.post('/income', function (req,res,next){

  var email = req.user.email;

  // DB object
  var db = require('../config/db').db;

  // Check for empty fields
  req.checkBody('amount', 'Importo non puo essere vuoto').notEmpty();
  req.checkBody('date', 'Data vuota').notEmpty();
  req.checkBody('description', 'Descrizione vuota').notEmpty();

  var errors = req.validationErrors();
  // Show errors, only available for non javascript enabled clients
  if (errors) {
    console.log('There have been validation errors: ' + errors);
    var errorsMsg = errors.map(function(el){
      return el.msg;
    })
    return res.json({
      errors: errorsMsg
    });
  }

  // Gather fields and create DB object
  var record = {
    user: email,
    amount: parseFloat(req.body.amount),
    type: req.body.type,
    date: new Date(req.body.date), // Date gets converted to ISO format once on MongoDB
    description: req.body.description
  }

  // inserisco in DB
  db.collection('transactions').insert(
    record,
    function (err,doc){
      if (err){
        res.json({
          error: 'Errore inserimento transazione' + err
        });
        throw err;
      }else{
        console.log('transaction added'.green, doc);
        res.json({
          success: 'Transazione inserita'
        })  
      }
    }
  );
});

// Handle expense add
router.post('/expense', function (req,res,next){

  var email = req.user.email;

  // DB object
  var db = require('../config/db').db;

  // Check for empty fields
  req.checkBody('amount', 'Importo non puo essere vuoto').notEmpty();
  req.checkBody('date', 'Data vuota').notEmpty();
  req.checkBody('category', 'Categoria vuota').notEmpty();

  var errors = req.validationErrors();
  // Show errors, only available for non javascript enabled clients
  if (errors) {
    console.log('There have been validation errors: ' + errors);
    var errorsMsg = errors.map(function(el){
      return el.msg;
    })
    return res.json({
      errors: errorsMsg
    });
  }

  // controllo se la categoria esiste
  db.collection('categories').findOne({
    name: req.body.category.trim()
  }, function (err, category){
    if (err) throw err;
    console.log('categoria trovata ' + category);
    if (!category){
      return res.json({
        errors: ['La categoria ' + req.body.category + ' non esiste']
      })
    }
    // se esiste devo prendere il suo object ID
    var categoryID = category._id;

    // Gather fields and create DB object
    var record = {
      user: email,
      amount: parseFloat(-req.body.amount),
      type: req.body.type,
      date: new Date(req.body.date), // Date gets converted to ISO format once on MongoDB
      // se avessi ricevuto il category ID come stringa lato client l'avrei dovuta trasformare in objectiD con
      // category: new ObjectID(req.body.category),
      category: categoryID,
      shared: {
        name: req.body.shared.trim(),
        paidByMe: parseFloat(req.body.paidByMe),
        paidByOther: parseFloat(req.body.paidByOther)
      },
      description: req.body.description
    }

    // controllo se lo shared esiste, in caso contrario lo inserisco
    db.collection('sharers').count({
      name: req.body.shared.trim(),
      user: email
    }, function (err, count){
      if (err) throw err;
      if (count === 0){
        // lo sharer viene aggiunto
        db.collection('sharers').insert({
          name: req.body.shared.trim(),
          user: email
        }, function (err, res){
          if (err) throw err;
        })
      }
      
      // prima di inserire in Db devo verificare i collegamenti con categoria e shared
      db.collection('transactions').insert(record, function (err, transaction){
        if (err) throw err;
        res.json({
          success: 'expense inserita con successo'
        });
      })
    })
    

  })



  
});

//
// TYPEAHEAD HANDLER
// 

var Sharer = require('../models/sharer');
// Handle sharer typeahead
router.get('/sharer/:name.json', function (req, res, next){
  
  var db = res.locals.db;

  var email = req.user.email;
  var name = req.params.name.trim();
  
  // return the names of the sharers associated to this user
  Sharer.findByEmail(email, name, db, function (sharer){
    res.json(sharer)
  });

});

var Category = require('../models/category');
// Handle sharer typeahead
router.get('/category/:name.json', function (req, res, next){
  
  var db = res.locals.db;
  var name = (req.params.name.trim() === 'showmeeverythingyougot') ? '' : req.params.name.trim();

  // finds all categories
  Category.findByNameTag(name, db, function (categories){
    res.json(categories);
  });

});

// add new category handler
router.post('/add-category', function (req, res, next){
  
  var db = res.locals.db;

  Category.add({
    name: req.body.name,
    tags: req.body["tags[]"],
    detractionAmount: parseFloat(req.body.detractionAmount),
    beneStrumentale: Boolean(req.body.beneStrumentale)
  }, db, function(err){
    if (err){
      return res.json({
        errors: err
      })
    }
    res.json({
      success: 'ok categoria aggiunta'
    })
  })

})

// remove fake handler
router.post('/deleteFake', function (req, res, next){

  var db = res.locals.db;

  var email = req.user.email;
  var period = req.body.period;
  
  var search = {
    user: email,
    date: {
      $gte: new Date(period,0,1),
      $lte: new Date(period,11,31)
    },
    type: 'fake'
  }

  if (period === '')
    delete search.date

  db.collection('transactions').remove(search, function (err, response){
    if (err) throw err;
    res.json({
      success: 'fake anno ' + period + ' eliminati'
    })
  })

})

// delete transaction
router.post('/deleteTransaction', function (req, res, next){

  var db = res.locals.db;
  var email = req.user.email;

  console.log('elimino ' + req.body.id + ' di user ' + email);

  db.collection('transactions').remove({
    _id: new ObjectID(req.body.id),
    user: email
  }, function (err, response){
    if (err) throw err;
    res.json({
      success: 'record eliminato'
    })
  })
});

// get transaction details
router.get('/getDetails', function (req, res, next){
  var user = req.user.email;
  var id = req.query.id;
  var db = res.locals.db;

  db.collection('transactions').aggregate([
  {
    $match: {
      _id: new ObjectID(id),
      user: user
    }
  }, {
    $lookup: {
      from: "categories", 
      localField: "category",
      foreignField: "_id",
      as: "category_lookup"
    }
  }, {
    $project: {
      amount: 1,
      shared: 1,
      type: 1,
      date: 1,
      category: '$category_lookup.name',
      description: 1
    }
  }
  ], function (err, transaction){
    if (err) throw err;
    console.log('found transaction', transaction);
    res.json(transaction[0]);
  })
});

// update transaction
router.post('/editTransaction', function (req,res,next){
  var user = req.user.email;
  var db = res.locals.db;

  console.log('arrivata update request');
    console.log(req.body);

  // if expense
  if ('shared' in req.body){
    // get the category id
    db.collection('categories').findOne({
      name: req.body.category
    }, function (err, category){
      if (err) throw err;
      console.log('trovata category', category);
      // update the transaction
      db.collection('transactions').updateOne({
        user: user,
        _id: new ObjectID(req.body.id)
      }, {
        $set: {
          amount: parseFloat(-req.body.amount),
          type: req.body.type,
          date: new Date(req.body.date),
          category: category._id,
          shared: {
            name: req.body.shared,
            paidByMe: parseFloat(req.body.paidByMe),
            paidByOther: parseFloat(req.body.paidByOther)
          },
          description: req.body.description
        }
      }, function (err, r){
        if (err) throw err;
        console.log('transaction aggiornata', r);
        res.json({
          success: 'expense transaction aggiornata'
        })
      });
    })
  }else{
    // it's income
    db.collection('transactions').updateOne({
      user: user,
      _id: new ObjectID(req.body.id)
    }, {
      $set:{
        amount: parseFloat(req.body.amount),
        type: req.body.type,
        date: new Date(req.body.date),
        description: req.body.description
      }
    }, function (err, r){
      if (err) throw err;
      res.json({
        success: 'income transaction aggiornata'
      })
    })
  }
})

module.exports = router;
