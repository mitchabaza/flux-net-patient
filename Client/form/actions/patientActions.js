var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/patientConstants');
var ServiceClient = require("../api/patientService.js");
// Define action methods
var Actions = {
     
    search: function(data) {          
        ServiceClient.search(data);
    },
    receiveSearchResults:function(data) {
        AppDispatcher.handleAction({
            actionType: Constants.RECEIVE,
            data: data
        });
    },
    select: function(data) {
        AppDispatcher.handleAction({
            actionType: Constants.SELECT,
            data: data
        });
    },
    clear: function() {
        AppDispatcher.handleAction({
            actionType: Constants.CLEAR,
            data: null
        });
    },


};
module.exports = Actions;