
var sharers = {
	findByEmail: function(email, name, db, callback){

		var reg = new RegExp('.*' + name + '.*', 'i');
		
		db.collection('sharers').find({
			user: email,
			name: {
				$regex: reg
			}
		},
		{
			name: 1,
			_id: 0
		})
		.toArray(function (err, sharers){
			if (err) throw err;
			callback(sharers);
		});
	}
}

module.exports = sharers;