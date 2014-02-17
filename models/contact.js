(function(module, require) {
  'use strict';

  /*
  --------------
  This is the "model" for a Rekindle user's contact (friend), will soon be rewritten using Mongoose and MOngoDB classes
  --------------
  */

  var contact = {
  	
    /*
    Given a contact's ID, returns their information in JSON object
    -------------
  	*/
  	get_details: function(req, res, contact_facebook_id) {

      // Get static data from JSON file
      var profiles_json = require("../contact_data.json");

      // Loop through data to get correct info
      var return_data = null;
      profiles_json.forEach(function(item, index) {
        if(item.id == contact_facebook_id) {
          return_data = item;
        }
      });

      // Return JSON object
      return return_data;
    }


  };

  module.exports = contact;

}(module, require));