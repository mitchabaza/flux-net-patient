var React = require("React");

var Patient = React.createClass({
  	render:function(){
		if (this.props.selectedPatient!=null)
		{
			return	(
				
				 
					<dl className="dl-horizontal">
						<dt>Name</dt>
						<dd>{this.props.selectedPatient.FirstName + " " + this.props.selectedPatient.LastName}</dd>
						<dt>DOB</dt>
						<dd>{this.props.selectedPatient.DateOfBirth}</dd>
						<dt>Admit Date</dt>
						<dd>{this.props.selectedPatient.AdmitDate}</dd>
						<dt>Weight</dt>
						<dd>{this.props.selectedPatient.Weight}</dd>
						<dt>Height</dt>
						<dd>{this.props.selectedPatient.Height}</dd>

					</dl>
					);
		}
		else{			return <div/>		}
	}

})

module.exports= Patient;