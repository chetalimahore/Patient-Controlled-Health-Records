import React , {Component} from 'react';


class ViewFileData extends Component{


	 	constructor(props){

		 	super(props);

		 	this.state = {
		 		accessEditable : false
			}
		}

		onSubmitButtonClicked = (e) => {
		  	this.setState({accessEditable : false});
		  	document.getElementById('textareaid').disabled = true;

		  	let value = document.getElementById('selectid').value;
			let addr = value.split(',')[1];
		  	let file = document.getElementById('textareaid').value;

		  	this.props.app.saveFile(addr,file,{ from: this.props.account ,  gas:3000000})
			.then((result) => {
				this.setState({accessEditable : false}); 
				document.getElementById('textareaid').value = file;
				this.props.onFileChanged(e, file)
			})
		}


		  onEditClicked = (e) =>{
		  	this.setState({accessEditable : true});
		  	document.getElementById('textareaid').disabled = false;

		  }

		  onCancelClicked = (e)=>{
		  	this.setState({accessEditable : false});
		  	document.getElementById('textareaid').disabled = true;
		  }

		  getFile = (fileContent) =>{

		  	let file = this.props.fileContent;
		  	let element = document.getElementById('textareaid');
		  	if(element == null || element == undefined){
		  		return file;
		  	}else{
		  	    element.value = file;
		  	}
		  	return element;  	
		  } 


		render(){

			return (
			<div>
				<div >
			 		<textarea rows="3" cols="45" id = "textareaid" disabled = "true" className = "h5 pa3 ma5">{this.getFile()}</textarea>
			 	</div>

				{this.state.accessEditable && <div
		           className="f3-ns link dim ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90"
		           onClick={this
		           .onSubmitButtonClicked
		           .bind(this)}>
		           Submit
		         </div>
		     	}
		          {(this.props.permissionBit == 1) && !this.state.accessEditable && <div
		           className="f3-ns link dim ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90"
		           onClick={this
		           .onEditClicked
		           .bind(this)}>
		           Edit
		         </div>
		     	}
		      	{this.state.accessEditable && <div
		           className="f3-ns link dim ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90"
		           onClick={this
		           .onCancelClicked
		           .bind(this)}>
		           Cancel
		         </div>
		  		}

		  	</div>
			 );
		}
}


export default ViewFileData;