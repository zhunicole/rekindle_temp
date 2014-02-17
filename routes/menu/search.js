
/*
 * GET the search page
 */

var User = require('../../models/user');

exports.view = function(req, res){
	// Check for query
	var q = req.query.q || '';

	// Do search
	var contacts_json = User.get_swipe_list();
	results = search(contacts_json, q);

	// Render
  res.render('search', {
  	head_title: 'Search',
  	q: q,
  	results: results
  });
};

function search(contacts, query) {
	if (! query) {
		return contacts; // Do we want to return everything or nothing here?
	}

	// Define and build index ... every single time. LOL
	var idx = lunr(function () {
		this.field('firstname', {boost: 10});
		this.field('surname', {boost: 10});
		this.field('location');
		this.field('milestone');
	})
	contacts.forEach(function(contact) {
		idx.add(contact);
	})

	//Search
	return idx.search(query).map(function(match) {
		return contacts.filter(function(contact) {
			return contact['id'] == match['ref'];
		})[0];
	});
}