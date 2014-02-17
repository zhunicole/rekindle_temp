
/*
 * GET the logout page
 */

exports.view = function(req, res){
  res.render('logout', {head_title: 'Logout'});
};