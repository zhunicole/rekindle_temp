
/*
 * GET the settings page
 */

exports.view = function(req, res){
  res.render('settings', {head_title: 'Settings'});
};