(function(){

	module.exports = {
		onlyDocs   : onlyDocs,
		onlyValues : onlyValues
	};

	/**
	 * Gets only the documents from a CouchDB query
	 * @param  {Array} rows Rows result from CouchDB query, although can also be
	 *                      the query object itself.
	 * @return {Array}      Only the docs
	 */
	function onlyDocs(rows) {
		// If a couch query itself is passed, remove the 
		// unused attributes before mapping
		rows = (rows.hasOwnProperty('rows')) ? rows.rows : rows;

		var docs = rows.map(function(e){
			return e.doc;
		});

		return docs;
	}

	/**
	 * Gets only the values from a CouchDB query
	 * @param  {Array} rows Rows result from CouchDB query, although can also be
	 *                      the query object itself.
	 * @return {Array}      Only the values
	 */
	function onlyValues(rows) {
		// If a couch query itself is passed, remove the 
		// unused attributes before mapping
		rows = (rows.hasOwnProperty('rows')) ? rows.rows : rows;

		var docs = rows.map(function(e) {
			return e.value;
		});

		return docs;
	}

})();