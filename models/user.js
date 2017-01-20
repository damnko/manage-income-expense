
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  findEmail : function(db, email, callback){
    db.collection('users').findOne(
    {
      email: email
    },
      callback
    )
  },
  insertUser : function (db, user, callback){
    db.collection('users').insert(
    user,
    callback
    )
  },
  findById : function(db, id, callback){
    db.collection('users').findOne({
      _id: new ObjectID(id)
    }, callback)
  }
}

// same as module.exports.findEmail = function (db, email, callback)
//         module.exports.insertUser = function (db, user, callback)
//         ...