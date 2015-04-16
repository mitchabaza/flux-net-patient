var React = require("React");
var Input = require('react-bootstrap').Input; 
var Actions = require("../actions/formActions.js") 
var FieldStore = require("../stores/formstore.js")
var createStoreMixin = require('../mixins/StoreListenerMixin')
var PatientStore =  require("../stores/patientStore.js")
PatientStore  = new PatientStore ();
var Fields = React.createClass({
	mixins: [createStoreMixin(FieldStore, PatientStore)],

	handleOnChange:function(e){
	
 		Actions.updateField( {key:e.target.attributes['data-fieldname'].value, value:e.target.value})
	},

	componentDidMount: function () {
        this.setState(this.getStateFromStores());
	},
	getStateFromStores:function() {
    return {
		patient:PatientStore.getState(),
		form: FieldStore.getState()
    };
  },
 	render:function(){
		 return (<div className="row">
      <Input onChange={this.handleOnChange} data-fieldname="Signs and Symptoms" type="text" label='Text' defaultValue="Enter text" value={this.state.form.fields['Signs and Symptoms']} />
      <Input onChange={this.handleOnChange} data-fieldname="NotFeelingWell"  type="checkbox" label="NotFeelingWell"   />
      <Input onChange={this.handleOnChange} data-fieldname="NotFeelingGreat"  type="checkbox" label="NotFeelingGreat"   />
      <Input onChange={this.handleOnChange} data-fieldname="DateOfEvent"  type="text" label="DateOfEvent"   />
     
	  <Input onChange={this.handleOnChange} data-fieldname="Location" value={this.state.form.fields['Location']}  type="select" label='Select'>
			<option value="select">Select...</option>
			<option value="Knee">Knee</option>
			<option value="Elbow">Elbow</option>
			<option value="Arse">Arse</option>
      </Input>
    </div>)
	}

})

module.exports= Fields;