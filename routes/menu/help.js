
/*
 * GET the help page
 */

exports.view = function(req, res){
  res.render('help', {head_title: 'Help'});
};