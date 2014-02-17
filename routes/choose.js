/*
 * GET the 'tinder' style choose friends page.
 */

var User = require('../models/user');

exports.view = function(req, res){

// Authenticate the user
User.check_session();
// Get the list of candidates for swiping
var swipe_json = User.get_swipe_list();
// Get the current contact queue for showing the queue
var queue_json = User.get_queue_list();

res.render('choose', {
    head_title: 'Choose',
    'candidates': swipe_json,
    'queue': queue_json
  });
};