var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/formConstants');
var _ = require("lodash");
//private state
var _fields = {};

_fields['Location'] = 'Knee';
_fields['Readmission'] = 'checked';
_fields['DateOfEvent'] = '2000-10-05';
 var FormStore = _.extend(EventEmitter.prototype, {

    emitChange: function () {
        this.emit('change');
    },
   
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
    ,
    getState:function() {
        return { fields: _.clone(_fields), title: _fields['Location']}
    }
        
});


AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {

        case Constants.UPDATEFIELD:
            _fields[action.data.key] = action.data.value;
            break;
         
        default:
            return true;
    }
    
    // If action was responded to, emit change event
    FormStore .emitChange();
    
    return true;
});

module.exports = FormStore ;