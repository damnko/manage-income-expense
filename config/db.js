var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/piva';


var _db = null;
module.exports.getDb = function(){ return _db; }

module.exports.init = function(callback){
	MongoClient.connect(url, function(err, db){
		_db = db;
	    if(!err){
	        console.log('mongodb connected');
	    }
	    module.exports.db = db;
	    callback(err);
	});
};