var React = require("React");
var Form = require("./ssi.jsx") 
var Store= require("../Stores/PatientStore.js") 

 


var patientSearch = React.createClass({

	getInitialState:function(){
		return {selectedPatient:null} 
	},
	componentDidMount: function() {
        Store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this._onChange);
    },
	 _onChange: function() {
        this.setState({selectedPatient:Store.getSelectedPatient()});
    },
    render: function() {
         return (
		<div>
			<Form selectedPatient={this.state.selectedPatient}/>
			
        </div>);
    }

})

module.exports = patientSearch ;




