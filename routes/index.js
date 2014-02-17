
/*
 * GET the home/intro/login page
 */

exports.view = function(req, res){
	var id = req.params.id || 3; 
  res.render('index' + id, {
  	head_title: 'Rekindle',
  	scripts: ['index_fade.js'],
  	stylesheets: ['index_testing.css']
  });
};