var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/patientConstants');
var Client = require("../utils/serviceClient.js");
var _ = require("lodash");
//private state
var patient;

// Extend PatientSearchStore with EventEmitter to add eventing capabilities
var PatientStore = _.extend(EventEmitter.prototype, {
    
    
    
    getPatients: function () {
        return _data;
    },
    getSelectedPatient: function () {
        if (_data.length > 0 && _patientId != null)
            return _.find(_data, function (patient) { return patient.MRN == _patientId; });
        else {
            return null;
        }
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
            _patientId = action.data;
            break;
        case Constants.CLEAR:
            _patientId = null;
            break;
        
        default:
            return true;
    }
    
    // If action was responded to, emit change event
    PatientSearchStore.emitChange();
    
    return true;
});

module.exports = PatientStore;