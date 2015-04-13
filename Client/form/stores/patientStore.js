var Constants = require('../constants/patientConstants');
var _ = require("lodash");
var BaseStore = require("./BaseStore");

 
class PatientStore extends BaseStore{

constructor() {
    super();
    
    this.data = { }    ;
    this.selectedPatient =null;
    
    
}

_selectPatient(mrn) {
    this._selectedPatient = _.find(this._data, function (patient) { return patient.MRN == mrn; });
     
}

getPatients() {
    return this._data.map(function (item) { return { Name: item.FirstName + " " + item.LastName, MRN: item.MRN, DateOfBirth: item.DateOfBirth } });
}


getSelectedPatient() {
    return this._selectedPatient;
}

handleDispatch(payload) {
    var action = payload.action;
    switch (action.actionType) {

        case Constants.RECEIVE:
           this._data = action.data;
            break;
        case Constants.SELECT:
            this. _selectPatient(action.data);
            this._data = [];
            break;
        case Constants.CLEAR:
            this._selectedPatient = null;
            break;
        
        default:
            return true;
    }
    
    // If action was responded to, emit change event
    this.emitChange();
    
    return true;
};


}






module.exports = PatientStore;