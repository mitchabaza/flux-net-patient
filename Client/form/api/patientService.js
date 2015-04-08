'use strict';

var Superagent = require("superagent");

var ServiceClient = {
   
   
    search: function (criteria) {
        var actions = require("../actions/patientActions.js");
        
        Superagent
            .post('http://localhost/AmsService/patient/search?criteria=' + criteria)
            .set('Accept', 'application/json')
            .end(function(res) {
                if (res.ok) {
                    actions.receiveSearchResults(res.body);

                } else {
                    alert('Oh no! error ' + res.text);
                }
            });
    }
};

module.exports = ServiceClient;