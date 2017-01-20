

module.exports.findByNameTag = function(name, db, callback){

	var reg = new RegExp('.*' + name + '.*','i');

	db.collection('categories').find({
		$or: [{
			name: { $regex: reg }
		}, {
			tags: { $regex: reg }
		}]
	}, {
		name: 1,
		detractionAmount: 1,
		_id: 0
	}).toArray(function (err, categories){
		if (err) throw err;
		callback(categories);
	})
}

module.exports.add = function(data, db, callback){
	// check if already existing
	db.collection('categories').find({name: data.name}).toArray(function (err,categories){
		if (err) throw err;
		if (categories.length){
			// callback handles errors only
			return callback(['Categoria gia esistente']);
		}
		// create new, if non-existing
		db.collection('categories').insert(
			data, 
			function (err, res){
				if (err) throw err;
				console.log('new category added', res);
				callback(null);
			}
		)
	})
}