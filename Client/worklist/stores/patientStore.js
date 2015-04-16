var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/patientConstants');
var _ = require("lodash");
var ageCalculator = require('age-calculator');

//private state
var _data=[];
var _selectedPatient;

function _selectPatient(mrn) {
    _selectedPatient = _.find(_data, function (patient) { return patient.MRN == mrn; });
    var age = ageCalculator.getAge(_selectedPatient.DateOfBirth).toString();
    _selectedPatient = _.extend({}, _selectedPatient, { Age: age});

}
// Extend PatientSearchStore with EventEmitter to add eventing capabilities
var PatientSearchStore = _.extend(EventEmitter.prototype, {
    
    getPatients: function () {
 
  
        return _data.map(function(item) {
            var age = ageCalculator.getAge(item.DateOfBirth).toString();
            return { Name: item.FirstName + " " + item.LastName, MRN: item.MRN, DateOfBirth: item.DateOfBirth, Age: age }
        });
    },
   

    getSelectedPatient: function () {
        return _selectedPatient;
    },
     
    
    emitChange: function () {
        this.emit('change');
    },
    
    
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    
    
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }

});


AppDispatcher.register(function (payload) {
    var action = payload.action;
     switch (action.actionType) {

        case Constants.RECEIVE:
            _data = action.data;
            break;
        case Constants.SELECT:
            _selectPatient(action.data);
            _data = [];
            break;
        case Constants.CLEAR:
            _selectedPatient = null;
            break;
        
        default:
            return true;
    }
    
    // If action was responded to, emit change event
    PatientSearchStore.emitChange();
    
    return true;
});

module.exports = PatientSearchStore;