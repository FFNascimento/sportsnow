module.exports = {
    getAllProducts: {
        map: function(doc) {
            if (doc.type === "product") {
                emit(doc.name, {
                    _id: doc._id
                });
            }
        }
    }
}
