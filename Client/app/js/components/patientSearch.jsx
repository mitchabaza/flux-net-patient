var React = require("react")
var Actions = require("../actions/patientActions.js") 
var PatientSearchResults = require("./patientSearchResults.jsx")
var PatientSearchStore = require("../stores/patientStore.js")


var PatientSearch = React.createClass({
    
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
		return {patients:[],sort:{column:"", dir:""},showSearch:true};
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
	handleSelectPatient:function(){
		this.setState({showSearch:!this.state.showSearch})
	
	},
    handleSearch:function(e){
	 
	if (e.keyCode!=undefined){
		  var code = (e.keyCode ? e.keyCode : e.which);
			if(code != 13) {
			   return;
			}
			Actions.search(this.refs.searchText.getDOMNode().value)
		}
	else{
			Actions.search(this.refs.searchText.getDOMNode().value)
		}
	},
    render: function() {
	
		var show=this.state.showSearch?"none":"block";
		var divStyle = {
			display:  show
		};
         return (
		<div>
		 <div className="row" onClick={this.handleSelectPatient}>{this.props.selectedPatient==null?"Select a":"Change"} patient...</div>
		 <div className="row" style={divStyle}>
            <div id="imaginary_container"> 
                <div className="input-group stylish-input-group">
                    <input ref="searchText" type="text" onKeyPress={this.handleSearch} className="form-control" placeholder="Search"/>
                    <span className="input-group-addon">
                        <button onClick={this.handleSearch} type="button">                        
						    <span className="icon icon-search"></span>
                        </button>  
                    </span>
                </div>			
            </div>
        </div>
	 
   <PatientSearchResults onSort={this.handleSort} patients={this.state.patients} sortState={this.state.sort} />
	</div>
 )
    }

})


module.exports = PatientSearch ;




