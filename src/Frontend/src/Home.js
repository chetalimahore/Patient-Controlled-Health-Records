import React , {Component} from 'react';
import Scroll from './Scroll';
import ViewGrant from './ViewGrant';
import AccessData from './AccessData';


class Home extends Component{


	  constructor(props) {
	    super(props);
	    this.state = {
	      isViewGrantList : true,
	      isAccessGrantList : false,
	      logOut : false,
	      userArray : [],
	      grantList: []
	    };

	    this.props.app.getGrantList({ from: this.props.account ,  gas:3000000})
        .then(
          (list) =>{
             this.setState({grantList : list},this.loadTable);

           }
        )

	  }

	  loadTable = () =>
	  {
	  	this.props.app.registeredUsers({ from: this.props.account ,  gas:3000000}).
		    then((numberOfRegisteredUsers)=>{
		      let arr = [];
		      for(var i = 1 ; i <= numberOfRegisteredUsers.toNumber() ; i++){
		        this.props.app.idToAddr(i,{ from: this.props.account ,  gas:3000000})
		        .then(
		          (Address)=>{
		            this.props.app.addressToUsers(Address,{ from: this.props.account ,  gas:3000000})
		        .then(
		            (user)=>{
		            
                     if(this.state.grantList.includes(Address)){

                     	this.props.app.getPermissionBit(Address,{ from: this.props.account ,  gas:3000000}).
		  				then(
			  				(bit)=>{
			  					if(bit == 0 || bit == 1){
			  						arr.push(
						              {
						              	id: user[1].toNumber(),
						              	name: user[0],
						              	addr: Address,
						              	permission : bit
						              });
			  					}
			  					
                     	
                     }
		              
		            )
		          }else
			  					{
			  						arr.push(
						              {
						              	id: user[1].toNumber(),
						              	name: user[0],
						              	addr: Address,
						              	permission : -1
						              });
			  					}
		      }
		        )
		      })}


		      this.setState({userArray : arr});
		    })
	  }


	  showGrantList(event)
	  {
	    this.setState({isViewGrantList : true, isAccessGrantList : false});

	  }

	  showAccessList(event)
	  {
	  	this.setState({isViewGrantList : false, isAccessGrantList : true});
	  }


	  logoutFunction(event)
	  {
	  	this.props.LoggedOut(event);
	  }

	  onViewSubmit(event, idArray, permissionArray, addrArray)
	  {

	  	this.props.app.editGrantList(idArray,permissionArray,{ from: this.props.account ,  gas:3000000})
        .then(
          (success) =>{
            this.setState({grantList : addrArray}, this.loadTable);
            
          }
        )
	  }

		render(){


			return (
			 <div>
			 		 <div className = "tr f3-ns ph4 pv1 mb2">
			 		 <label className = "fw6 i" >Welcome {this.props.userName}!!</label>
			 		 </div>

			          <div className = "tc">
			                 <div className = "f3-ns link grow ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill" 
			                      onClick = {this.showGrantList.bind(this)}>View/Edit Grant List</div>
			                 <div className = "f3-ns link grow ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill" 
			                      onClick = {this.showAccessList.bind(this)}>Access Patient Data</div> 
			                 <div className = "f3-ns link grow ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill" 
			                      onClick = {this.logoutFunction.bind(this)}>Logout</div>   

			                 <div>
			                 <section className = "w4 bg-blue"/>
			                 </div>


			                 <Scroll>
			          
						           <div className="tc">
							          {this.state.isViewGrantList && <ViewGrant app = {this.props.app} account ={this.props.account} viewGrant = {this.state.userArray} grantList = {this.state.grantList} onViewSubmit = {this.onViewSubmit.bind(this)}/>}
							          {this.state.isAccessGrantList && <AccessData app = {this.props.app} account ={this.props.account} userArray = {this.state.userArray}/>}
							       </div>
				       	 
		
					         </Scroll>
			          </div>
			      
		         
	         </div>
	        );
		}
}

export default Home;