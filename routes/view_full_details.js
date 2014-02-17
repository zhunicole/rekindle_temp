
/*
 * GET the view profile page for a particular friend
 */

var User = require('../models/user');
var Contact = require('../models/contact');

exports.view = function(req, res){

// Authenticate the user
User.check_session();

// Get the id of the friend being viewed
var id = req.params.id; 
// Get referred URL so back button goes back to last page
var referrer = req.headers['referer'];

// TODO, check that this user has priveledges to view this person (are they friends?)
var friend_json = Contact.get_details(req, res, id);

console.log(friend_json);

// Display detail
res.render('view_full_details', {
  head_title: friend_json.firstname,
	'referrer': referrer,
  'profile': friend_json
  });
};