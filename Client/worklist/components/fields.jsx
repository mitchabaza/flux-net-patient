var React = require("React");
var Input = require('react-bootstrap').Input; 
var Label = require('react-bootstrap').Label; 
var AgeCalculator = require('age-calculator');
var Actions = require("../actions/formActions.js") 
var FieldStore = require("../stores/formstore.js")
var createStoreMixin = require('../mixins/StoreListenerMixin')
var PatientStore =  require("../stores/patientStore.js")
var DateUtils = require("../DateUtils.js")
var Fields = React.createClass({
 
	handleOnChange:function(e){
	
 		Actions.updateField( {key:e.target.attributes['data-fieldname'].value, value:e.target.value})
	},
	handleOnCheck:function(e){
	
 		Actions.updateField({key:e.target.attributes['data-fieldname'].value, value:e.target.checked?"checked":"" })
	},
	
	setValue:function(field){
		this.props.form.fields[field]
	},

 	render:function(){
	
	if (this.props.selectedPatient!=undefined && Date.parse(this.props.form.fields.DateOfEvent) ){
		var ageNow= DateUtils.ageAsOf(this.props.selectedPatient.DateOfBirth,this.props.form.fields.DateOfEvent)	 
	}
	 return (<div className="row">
      <Input onChange={this.handleOnChange} data-fieldname="Signs and Symptoms" type="text" label='Notes' defaultValue="Enter text" value={this.props.form.fields['Signs and Symptoms']} />
      <Input onChange={this.handleOnCheck} data-fieldname="NotFeelingWell"  type="checkbox" label="Not Feeling Well" value={this.props.form.fields['NotFeelingWell']}  />
      <Input onChange={this.handleOnCheck}   data-fieldname="Readmission"  type="checkbox" label="Readmission" checked= {this.props.form.fields['Readmission']=='checked'}  />
      <Input onChange={this.handleOnChange} data-fieldname="DateOfEvent"  type="text" label="Date Of Event"  value={this.props.form.fields['DateOfEvent']} />
	 
	  <Input onChange={this.handleOnChange} data-fieldname="Location" value={this.props.form.fields['Location']}  type="select" label='Location of Procedure'>
			<option value="select">Select...</option>
			<option value="Knee">Knee</option>
			<option value="Elbow">Elbow</option>
			<option value="Taint">Taint</option>
			<option value="Arse">Arse</option>
      </Input>
	   
	<h4>Age At Event</h4><span>{ageNow}</span>
    </div>)
	}

})

module.exports= Fields;