(function(module, require) {
  'use strict';

  /*
  --------------
  This is the "model" for a Rekindle user, will soon be rewritten using Mongoose and MOngoDB classes
  --------------
  */

  var user = {
  	
    /*
    Authenicates the users session, loads the user object if session is valid and returns true, otherwise kicks them to login page.
    -------------
  	*/
  	check_session: function(req, res) {
      // This does nothing for now - will authenticate with Facebook using sessions etc.

      return true;
  	},


    /*
    Returns the logged in user's data (name, email, etc.)
    This is temporary, will be using Mongoose and mongoDB objects in future
    -------------
    */
  	get_data: function(req, res, dateIn, dateOut, pax) {
      
      // Load JSON data from static file
      var user_data = require("../user_data.json");
      var data = user_data.profile;
    
      // Return JSON data
      return data;
  	},


    /*
    Returns the logged in user's list of candidates to be swiped
    This is temporary, will be using Mongoose and mongoDB objects in future
    -------------
    */
    get_swipe_list: function(req, res) {
      
      // Load JSON data from static file
      var user_data = require("../user_data.json");
      var candidates = user_data.candidates;
    
    return candidates;
    },


     /*
    Returns the logged in user's list of queued contacts
    This is temporary, will be using Mongoose and mongoDB objects in future
    -------------
    */   
    get_queue_list: function() {

      // Load JSON data from static file
      var user_data = require("../user_data.json");
      var queue = user_data.queue;

    return queue;
    }


  };

  module.exports = user;

}(module, require));