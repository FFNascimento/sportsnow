module.exports = {
	getAllUsers: {
		map: function(doc) {
			if(doc.type === "user") {
				emit(doc.PERMISSION_EMAIL, {
					_id: doc._id
				});
			}
		}
	}
}
