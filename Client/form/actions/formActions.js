var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/formConstants');
var WebService = require("../api/FormService.js");
// Define action methods
var Actions = {
     
    requestListFieldValues: function(data) {          
        WebService.listFields(data);
    },
    receiveListFieldValues:function(data) {
        AppDispatcher.handleAction({
            actionType: Constants.RECEIVEFIELDVALUES,
            data: data
        });
    },
    updateField:function(data) {
        AppDispatcher.handleAction({
            actionType: Constants.UPDATEFIELD,
            data: data
        });
        
    }


};
module.exports = Actions;