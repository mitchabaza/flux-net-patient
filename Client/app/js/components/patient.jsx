var React = require("React");

var Patient = React.createClass({
takeashit:function(){},
 	render:function(){
		if (this.props.selectedPatient!=null)
		{
			return	(
				
				<div className="row">
				 
					{this.props.selectedPatient.FirstName + " " + this.props.selectedPatient.LastName}<div>{this.props.selectedPatient.DateOfBirth}</div>
				</div>
					);
		}
		else{			return <div/>		}
	}

})

module.exports= Patient;