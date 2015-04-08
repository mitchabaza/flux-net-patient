'use strict';

var Superagent = require("superagent");

var ServiceClient = {
    
    
    listFieldValues: function (criteria) {
        var actions = require("../actions/formActions.js");
        
        Superagent
            .post('http://localhost/webservice/form/listFieldValues?criteria=' + criteria)
            .set('Accept', 'application/json')
            .end(function (res) {
            if (res.ok) {
                actions.receiveListFieldValues(res.body);

            } else {
                alert('Oh no! error ' + res.text);
            }
        });
    }
};

module.exports = ServiceClient;