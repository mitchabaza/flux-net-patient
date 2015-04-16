var React = require("React");
var Patient = require("./patient.jsx")
var PatientSearch = require("./patientSearch.jsx");
var Fields = require("./fields.jsx");

var SSI = React.createClass({
 	render:function(){
		  return (<div className="container">
			<div className="row"><h3>Create SSI - {this.props.form.title}</h3></div>
			<PatientSearch selectedPatient={this.props.selectedPatient}/>
			<Patient selectedPatient={this.props.selectedPatient}/>
			<Fields  {...this.props}/> 
		 </div>);
	}

})

module.exports= SSI;