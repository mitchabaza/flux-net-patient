var React = require("react")
var Actions = require("../actions/patientActions.js") 
var PatientSearchResults = require("./patientSearchResults.jsx")
var PatientSearchStore = require("../stores/patientStore.js")
var OverlayMixin = require('react-bootstrap').OverlayMixin; 
var Modal = require('react-bootstrap').Modal;
 
var PatientSearch = React.createClass({
     mixins: [OverlayMixin],
	componentDidMount:function(){
	    PatientSearchStore.addChangeListener(this._onChange);

	},
	componentDidUnmount:function(){
        PatientSearchStore.addChangeListener(this._onChange);
	},
	
	_onChange: function() {
        this.setState({patients:PatientSearchStore.getPatients()});
    },

	getInitialState: function(){
		return {patients:[],sort:{column:"", dir:""},isModalOpen:false};
	},
	renderOverlay: function () {
     
      return <span/>; 
    },
	handleSort:function(column){

	var sortDir;
		if (column==this.state.sort.column){
			if (this.state.sort.dir =="asc"){
				sortDir="desc"
			}
			else{
				sortDir="asc"
			
			}
		}else{
			sortDir="desc"
		}
		 
		if (sortDir=="asc"){
			var sortedPatients=	this.state.patients.sort(function(a, b){return a[column] < b[column]});
		}
		else{
			var sortedPatients=	this.state.patients.sort(function(a, b){return a[column] > b[column]});
		}

		this.setState({patient:sortedPatients});
		this.setState({sort:{column:column, dir:sortDir}});

	},
	handleSelectPatient:function(patient){
		this.setState({isModalOpen:false})
		Actions.select(patient);
	
	},
	handleClose:function(){
		this.setState({isModalOpen:false});
	},

    handleSearch:function(e){
	 
	if (e.keyCode!=undefined){
		  var code = (e.keyCode ? e.keyCode : e.which);
			if(code != 13) {
			   return;
			}
			this.setState({isModalOpen:true});
			Actions.search(this.refs.searchText.getDOMNode().value)
			
		}
	else{
			this.setState({isModalOpen:true});
			Actions.search(this.refs.searchText.getDOMNode().value)
		}
	},
    render: function() {
	var modal=null;
	var self=this;
	if (this.state.isModalOpen){
		modal=
		<Modal title="Select Patient" animation={false} onRequestHide={this.handleClose}  >
			<div className="modal-body">
				<PatientSearchResults onSort={this.handleSort} patients={this.state.patients} onPatientSelected={this.handleSelectPatient} sortState={this.state.sort} />
			</div>
			 <div className="modal-footer">
				<button onClick={this.handleClose} >Close</button>
			  </div>
			</Modal>
	}
	return (
	<div className="row">
	<h3>Patient</h3>
		<div id="custom-search-input">
			<div className="input-group col-md-12">
				<input ref="searchText"  type="text" className="  search-query form-control" placeholder="Search for patient..."/>
				<span className="input-group-btn">
					<button onClick={this.handleSearch} className="btn btn-danger" type="button">
						<span className=" icon icon-search"></span>
					</button>
				</span>
			</div>
		</div>
		
	{modal} 
	</div>)
    }

})


module.exports = PatientSearch ;




