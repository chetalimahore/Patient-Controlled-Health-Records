import React , {Component} from 'react';
import ViewFileData from './ViewFileData';

class AccessData extends Component{


	 	constructor(props){

		 	super(props);

		 	this.state = {
		 		permissionBit : 0,
		 		fileContent : 'View File Content Here'
			};
		}

		onFileChanged(e, content)
		{
			this.setState({fileContent : content});
		}

		onSubmitButtonClicked (e) 
		{
			let value = document.getElementById('selectid').value;
			let addr = value.split(',')[1];
			this.props.app.requestAccess(addr,{ from: this.props.account ,  gas:3000000})
			.then((result) => {
				this.setState({permissionBit: result[0].toNumber(), fileContent : result[1]});
			})
		}

		renderUsers = (userArray) =>
		{

		  	const listOfUsers = userArray.map((user, i) => {
		  		return(
		  			<option >{`${user.name},${user.addr}`}</option>
		  			);
		  		
		  	});

		  	return listOfUsers;
		}



		render(){
			if(this.props.userArray == undefined || this.props.userArray.length == 0){
				
				return(
					<div className="pa4">
					<h1> "Click on the buttons to get started" </h1>
					</div>
					);

			}else{

			return (
			 <div className="pa4">
			 	<div className="dib">	
				 	<div className="f4-ns dim ph4 pv1 mb2 dib black ma3">
				    	<select id = "selectid" className = "f3-ns avenir bg-white">
				   
				     		{
				     		this.renderUsers(this.props.userArray)
				     		}
				
						</select>
			 		</div>
				
		         	 <div
		           		className="f4-ns link dim ba bw1 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill"
		           		onClick={this
			           .onSubmitButtonClicked
			           .bind(this)}>
			           Get File
			         </div>
		      </div>

			 	
		      <ViewFileData app = {this.props.app} account ={this.props.account} permissionBit = {this.state.permissionBit} fileContent = {this.state.fileContent} onFileChanged = {this.onFileChanged.bind(this)}/>
			 	
			 </div>
	        );
			}			
		}
}

export default AccessData;