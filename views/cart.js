module.exports = {
    getAllCarts: {
        map: function(doc) {
            if (doc.type === "cart") {
                emit(doc.name, {
                    _id: doc._id
                });
            }
        }
    }
}
