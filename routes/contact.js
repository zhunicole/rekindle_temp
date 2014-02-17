
/*
 * GET the contact list page
 */

var User = require('../models/user');

exports.view = function(req, res){

// Authenticate the user
User.check_session();
// Get the current contact queue for showing the queue
var queue_json = User.get_queue_list();

res.render('contact', {
    head_title: 'Contacts',
    'contacts': queue_json
  });
};