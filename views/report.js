module.exports = {
    getAllReports: {
        map: function(doc) {
            if (doc.type === "report") {
                emit(doc.name, {
                    _id: doc._id
                });
            }
        }
    }
}
