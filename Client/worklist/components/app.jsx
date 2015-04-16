var React = require("React");
var Form = require("./ssi.jsx") 
var PatientStore= require("../Stores/PatientStore.js") 
var FieldStore= require("../Stores/FormStore.js") 
var createStoreMixin = require('../mixins/StoreListenerMixin')
 


var app = React.createClass({
	mixins: [createStoreMixin(FieldStore, PatientStore)],
	 

    render: function() {
         return (
		<div>
			<Form {...this.state}/>
			
        </div>);
    },


	getStateFromStores:function() {
		return {
		form: FieldStore.getState(),
		selectedPatient:PatientStore.getSelectedPatient()
		};
	}

})

module.exports = app ;




