import React , {Component} from 'react';


class ViewGrant extends Component{

		 constructor(props){

		 	super(props);

		 	this.state = {
		 		editable : false

		 	}

		 }

		
		  onSubmitButtonClicked = (e) => {
		  	this.setState({editable : false});

		  	let obj = this.makeArrays();

		  	this.props.onViewSubmit(e, obj.id, obj.permission, obj.addr);
		  }

		  onEditClicked = (e) =>{
		  	this.setState({editable : true});

		  }

		  onCancelClicked = (e)=>{
		  	this.setState({editable : false});
		  }

		  makeArrays = ()=>{
		  	let length = document.getElementById('tableId').children[1].children.length;
		  	let id = [], permissionArray = [], addrArray = [];


		  	for(let i = 1 ; i <= length+1 ; i++){
		  		if(document.getElementById(`${i}d`) != undefined)
		  		{
		  			if(document.getElementById(`${i}d`).checked)
			  		{
			  			let userId = parseInt(document.getElementById(`${i}a`).innerHTML);
			  			let addr = document.getElementById(`${i}c`).innerHTML;

			  			id.push(userId); addrArray.push(addr); permissionArray.push(0);


			  		}
			  		else if(document.getElementById(`${i}e`).checked)
			  		{
			  			let userId = parseInt(document.getElementById(`${i}a`).innerHTML);
			  			let addr = document.getElementById(`${i}c`).innerHTML;

			  			id.push(userId); addrArray.push(addr); permissionArray.push(1);


			  		}
		  		}
		  	}

		  	return {
		  		id: id,
		  		addr: addrArray,
		  		permission : permissionArray
		  	}


		  }




		  renderUsers = (userArray,grantList) =>
		  {
		  	let userCount = 1;
			let count = 0;

		  	const listOfUsers = userArray.map((user, i) => {
		  		// found in grantList

		  		if(user.addr != this.props.account){

		  		i = i+1 - count;
		  		
		  		if(user.permission == 1 ){
		  			if(!this.state.editable )
			  		{
			  			return (
						<tr className = "hover">
							  <td id = {i}  className="pv3 pr3 bb b--black-20" >{i}</td>
					          <td id = {`${user.id}a`}  className="pv3 pr3 bb b--black-20" hidden = "true">{user.id}</td>
					          <td id = {`${user.id}b`} value = {`${user.name}`} className="pv3 pr3 bb b--black-20">{user.name}</td>
					          <td id = {`${user.id}c`} value = {`${user.addr}`} className="pv3 pr3 bb b--black-20">{user.addr}</td>
					         <td className="pv3 pr3 bb b--black-20">
					         <form action="">
							  <input type="radio" id = {`${user.id}d`} className="mr1" name="access" value="read" disabled = "disabled"/><label className="pa2">Read Only</label>
							  <input type="radio" id = {`${user.id}e`} className="mr1" name="access" value="write" checked = "true" disabled = "disabled"/><label className="pa2">Write</label>
							  <input type="radio" id = {`${user.id}f`} className="mr1" name="access" value="noaccess" disabled = "disabled" /><label className="pa2" >No Access</label>
							 </form>
							</td>
			        	</tr>
			           );
			  		}
			  		else
			  		{
			  			return (
						<tr className = "hover">
							  <td id = {i}  className="pv3 pr3 bb b--black-20" >{i}</td>
					          <td id = {`${user.id}a`} className="pv3 pr3 bb b--black-20" hidden = "true">{user.id}</td>
					          <td id = {`${user.id}b`} className="pv3 pr3 bb b--black-20">{user.name}</td>
					          <td id = {`${user.id}c`} className="pv3 pr3 bb b--black-20">{user.addr}</td>
					         <td className="pv3 pr3 bb b--black-20">
					          <form action="">
							  <input type="radio" id = {`${user.id}d`} className="mr1" name="access" value="read" /><label className="pa2">Read Only</label>
							  <input type="radio" id = {`${user.id}e`} className="mr1" name="access" value="write" checked = "true"/><label className="pa2">Write</label>
							  <input type="radio" id = {`${user.id}f`} className="mr1" name="access" value="noaccess" /><label className="pa2" >No Access</label>
							</form>
							</td>
			        	</tr>
			           );
			  		}
		  			
                }
                else if(user.permission == 0)
                {
                	if(!this.state.editable)
			  		{
			  			return (
						<tr className = "hover">
							   <td id = {i}  className="pv3 pr3 bb b--black-20">{i}</td>
					          <td id = {`${user.id}a`} className="pv3 pr3 bb b--black-20" hidden = "true">{user.id}</td>
					          <td id = {`${user.id}b`} className="pv3 pr3 bb b--black-20">{user.name}</td>
					          <td id = {`${user.id}c`} className="pv3 pr3 bb b--black-20">{user.addr}</td>
					         <td className="pv3 pr3 bb b--black-20">
					          <form action="">
							  <input type="radio" id = {`${user.id}d`} className="mr1" name="access" value="read" checked = "true" disabled = "disabled"/><label className="pa2">Read Only</label>
							  <input type="radio" id = {`${user.id}e`} className="mr1" name="access" value="write"  disabled = "disabled"/><label className="pa2">Write</label>
							  <input type="radio" id = {`${user.id}f`} className="mr1" name="access" value="noaccess" disabled = "disabled" /><label className="pa2" >No Access</label>
							</form>
						    </td>
			        	</tr>
			           );
			  		}
			  		else
			  		{
			  			return (
						<tr className = "hover">
							   <td id = {i}  className="pv3 pr3 bb b--black-20">{i}</td>
					          <td id = {`${user.id}a`} className="pv3 pr3 bb b--black-20" hidden = "true">{user.id}</td>
					          <td id = {`${user.id}b`} className="pv3 pr3 bb b--black-20">{user.name}</td>
					          <td id = {`${user.id}c`} className="pv3 pr3 bb b--black-20">{user.addr}</td>
					         <td className="pv3 pr3 bb b--black-20">
					          <form action="">
							  <input type="radio" id = {`${user.id}d`} className="mr1" name="access" value="read" checked = "true"/><label className="pa2">Read Only</label>
							  <input type="radio" id = {`${user.id}e`} className="mr1" name="access" value="write"/><label className="pa2">Write</label>
							  <input type="radio" id = {`${user.id}f`} className="mr1" name="access" value="noaccess"/><label className="pa2" >No Access</label>
							  </form>
							 </td>
			        	</tr>
			           );
			  		}
                }

				else{
					if(!this.state.editable)
					{
						return (
						<tr className = "hover">
							  <td id = {i}  className="pv3 pr3 bb b--black-20" >{i}</td>
					          <td id = {`${user.id}a`} className="pv3 pr3 bb b--black-20" hidden = "true">{user.id}</td>
					          <td id = {`${user.id}b`} className="pv3 pr3 bb b--black-20">{user.name}</td>
					          <td id = {`${user.id}c`} className="pv3 pr3 bb b--black-20">{user.addr}</td>
					         <td className="pv3 pr3 bb b--black-20">
					          <form action="">
							  <input type="radio" id = {`${user.id}d`} className="mr1" name="access" value="read" disabled = "disabled" /><label className="pa2" >Read Only</label>
							  <input type="radio" id = {`${user.id}e`} className="mr1" name="access" value="write" disabled = "disabled"/><label className="pa2">Write</label>
							  <input type="radio" id = {`${user.id}f`} className="mr1" name="access" value="noaccess" disabled = "disabled"  checked = "true" /><label className="pa2" >No Access</label>
							</form>
							</td>
			        	</tr>
			        );
					}
					else{
					
						return (
						<tr className = "hover">
							   <td id = {i}  className="pv3 pr3 bb b--black-20" >{i}</td>
					          <td id = {`${user.id}a`} className="pv3 pr3 bb b--black-20" hidden = "true">{user.id}</td>
					          <td id = {`${user.id}b`} className="pv3 pr3 bb b--black-20">{user.name}</td>
					          <td id = {`${user.id}c`} className="pv3 pr3 bb b--black-20">{user.addr}</td>
					         <td className="pv3 pr3 bb b--black-20">
					         <form action = "">
							  <input type="radio" id = {`${user.id}d`} className="mr1" name="access" value="read"/><label className="pa2">Read Only</label>
							  <input type="radio" id = {`${user.id}e`} className="mr1" name="access" value="write"/><label className="pa2">Write</label>
							  <input type="radio" id = {`${user.id}f`} className="mr1" name="access" value="noaccess" checked = "true" /><label className="pa2" >No Access</label>
							  </form>
							 </td>
							
			        	</tr>
			        );
					}	
		  		}
		  		}
		  		else
		  		{

		  			count++;
		  		}


				});


		  
   			return listOfUsers;
		  }
 

		render(){
			if(this.props.viewGrant == undefined || this.props.viewGrant.length == 0){

				return(
					<div className="pa4">
					<h1 className = "fw9 ma3">Click buttons to get started!!</h1>
					</div>
					);

			}else{

			return (
			 <div className="pa4">
				 <div className="overflow-auto">
				    <table id = {`tableId`} className="f9 w-100 mw9 center ba" cellSpacing="2">
				      <thead>
				      	<tr>
						  <th className="fw9 f3 bb b--black-20 tc pa2 pb3 pr3 bg-light-blue avenir">Sr. No</th>
				          <th className="fw9 f3 bb b--black-20 tc pa2 pb3 pr3 bg-light-blue avenir">User Name</th>
				          <th className="fw9 f3 bb b--black-20 tc pa2 pb3 pr3 bg-light-blue avenir">Address</th>
				          <th className="fw9 f3 bb b--black-20 tc pa2 pb3 pr3 bg-light-blue avenir">Access Permission</th>
				      	</tr>
				      </thead>
				      <tbody className="tc bg-lightest-blue f4 avenir">
				     	{
				     		 
				     		this.renderUsers(this.props.viewGrant,this.props.grantList)
				     	}
				
				      </tbody>
				    </table>
					
			 </div>
			 <div className="tc">
		          {this.state.editable && <div
		           className="f3-ns link dim ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill"
		           onClick={this
		           .onSubmitButtonClicked
		           .bind(this)}>
		           Submit
		         </div>
		     }
		          {!this.state.editable && <div
		           className="f3-ns link dim ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill"
		           onClick={this
		           .onEditClicked
		           .bind(this)}>
		           Edit
		         </div>
		     }
		      {this.state.editable && <div
		           className="f3-ns link dim ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill"
		           onClick={this
		           .onCancelClicked
		           .bind(this)}>
		           Cancel
		         </div>
		  }

		      </div>

			 </div>
	        );
			}			
		}
}

export default ViewGrant;



