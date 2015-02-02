'use strict';

var React = require("React");
var Actions = require("../actions/patientActions.js");

var patientSearchResults = React.createClass({

	
	handleSort:function(e) {
	    this.props.onSort(e);
	},

	handleSelect:function(patient) {

		Actions.select(patient);

	},
    render: function() {

		var rows=[];
		var columnNames=[];
		var columns=[];
		var columnsDefined=false;
		var self=this;
		this.props.patients.forEach(function(item){
			var tds=[];
			tds.push(<td><button onClick={self.handleSelect.bind(null,item.MRN)} className="btn btn-sm btn-primary">Select</button></td>)
			for (var property in item){
				if (!columnsDefined){
					columnNames.push(property)
				}
				if (item.hasOwnProperty(property)) {
					tds.push(<td>{item[property]}</td>);
				}
		    }
			columnsDefined=true;
		 
			rows.push(<tr key={item.MRN}>{tds}</tr>)
		
		})
		var self=this;
		columns.push(<th/>)
columnNames.forEach(function(columnName){

	var sortClass;

	if(columnName==self.props.sortState.column){
		if (self.props.sortState.dir=="asc"){
			sortClass="glyphicon glyphicon-sort-by-alphabet-alt";
		}
		else{
			sortClass="glyphicon glyphicon-sort-by-alphabet";
		  
		}
	}
		columns.push(<th  key={columnName} onClick={self.handleSort.bind(null,columnName)}>{columnName}<span className={sortClass}></span></th>)
				
})
		
	if (rows.length>0)
		{
			return(
			<div>
				   <table id="patientSearchResults" className="table table-striped">
					<thead>
					  <tr>
						{columns}
					  </tr>
					</thead>
					<tbody>
					 {rows}
					</tbody>
				  </table>
			   		
			</div>   
			);}      
		return (<div className="row"/>)
    }
})

module.exports = patientSearchResults;