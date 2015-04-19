
var React = require("React");
var Input = require('react-bootstrap').Input; 
var Label = require('react-bootstrap').Label; 
var AgeCalculator = require('age-calculator');
var Actions = require("../actions/formActions.js") 
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
	
	var inputs = [];
	var self=this;
	this.props.form.fields.map(function(elem){
	var label = elem.label ||elem.key;
	var handler = self.handleOnChange;
	var isChecked=false;
	var innerHtml = []
	switch(elem.type) {

    case 'checkbox':
		handler= self.handleOnCheck;
		isChecked = elem.value=="checked";
        break;
    case 'select':
       elem.options.map(function(option){
			innerHtml.push(<option value={option}>{option}</option>)
	   })
	   break;
    default:
        //huh?
}

     inputs.push(<Input  onChange={handler} checked={isChecked==true} data-fieldname={elem.key} type={elem.type} label={label}  value={elem.value}>{innerHtml}</Input>);
 });
 

	if (this.props.selectedPatient!=undefined && Date.parse(this.props.form.fields.DateOfEvent) ){
		var ageNow= DateUtils.ageAsOf(this.props.selectedPatient.DateOfBirth,this.props.form.fields.DateOfEvent)	 
	}
	 return (<div className="row">
 {inputs}
     
	   
	<h4>Age At Event</h4><span>{ageNow}</span>
    </div>)
	}

})

module.exports= Fields;