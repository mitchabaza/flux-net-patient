'use strict';

var Superagent = require("superagent");

var ServiceClient = {
   
    // Receive initial product data
    search: function (criteria) {
        var actions = require("../actions/patientActions.js");
        
        Superagent
            .post('http://localhost/webservice/patient/search?criteria=' + criteria)
            .set('Accept', 'application/json')
            .end(function(res) {
                if (res.ok) {
                    actions.receiveSearchResults(res.body);

                } else {
                    alert('Oh no! error ' + res.text);
                }
            });
    },
// Receive initial product data
select: function (mrn) {
    var actions = require("../actions/patientActions.js");
    
    Superagent
            .post('http://localhost/webservice/patient/search?criteria=' + mrn)
            .set('Accept', 'application/json')
            .end(function (res) {
        if (res.ok) {
            actions.receiveSearchResults(res.body);

        } else {
            alert('Oh no! error ' + res.text);
        }
    });
} 
};

module.exports = ServiceClient;