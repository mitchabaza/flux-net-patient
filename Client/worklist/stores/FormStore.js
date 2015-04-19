var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/formConstants');
var _ = require("lodash");
//private state
var _fields = [
    { key: 'Location', value: 'Knee', label: "" , type: "select" ,options: ["Knee", "Taint","Arse", "Chest"]},
    { key: 'Readmission', value: 'checked', label: "",type:"checkbox" },
    { key: 'Medicare', value: 'Knee', label: "" , type:"checkbox"},
    { key: 'DateOfEvent', value: '2010-12-13', label: "Date Of Event", type: "text"  },
    { key: 'Notes', value: '', label: "" , type: "text" },
    {key: 'SignsAndSymptoms',value:'fever, rash, nausea',label:'Signs And Symptoms', type: "text" }
];

 

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
    getTitle:function() {
        var title = _.find(_fields, function (e) {
            return e.key == "Location";
        });
        return title.value;
    },
    getState: function () {
        var self = this;
        return { fields: _.clone(_fields), title: self.getTitle()}
    }
        
});


AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {

        case Constants.UPDATEFIELD:
            var field = _fields.filter(function(e) {
              return  e.key== action.data.key;
            });
           // field[0].value =  action.data.value;
            var field2 = _.find(_fields, function(e) {
                return e.key == action.data.key;
            });
            field2.value = action.data.value;
            break;
         
        default:
            return true;
    }
    
    // If action was responded to, emit change event
    FormStore .emitChange();
    
    return true;
});

module.exports = FormStore ;