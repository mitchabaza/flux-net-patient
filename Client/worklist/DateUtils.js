'use strict';


var DateUtils = {
    
    
    ageAsOf: function (birthday, asOf) {
        var ageDifMs = Date.parse(asOf) - Date.parse(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

};
 
module.exports = DateUtils