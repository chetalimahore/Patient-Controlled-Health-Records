import React , {Component} from 'react';
import './loginStyle.css';

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error : false ,
      errorMessage : 'Error!'
    };
  }

  submitRegister(e) {
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirm_password  = document.getElementById('confirm_password').value;

    if(password == confirm_password){
      //alert('User is registered!');
      this.props.app.registeredUsers({ from: this.props.account ,  gas:3000000})
      .then((number) =>{
        let old = number.toNumber();

        this.props.app.registerUser(username, password ,{ from: this.props.account ,  gas:3000000})
      .then((isRegistered) =>{
   
        this.props.app.registeredUsers({ from: this.props.account ,  gas:3000000})
      .then((number) =>{
        let newVal = number.toNumber();


        if(newVal > old){
          this.setState({error : false});
         this.props.loginChange(e); 
        }
        else{
          this.setState({error : true, errorMessage : 'User already registered!'});
        }


      });

      });

      });

      
    }
    else {
      this.setState({error : true, errorMessage : 'Passwords do not match!'});
    }
    e.preventDefault();
  }

  render() {

    return (
      <div className="inner-container">
        <div className="f3 fw6 ph0 mh0">
          Register
        </div>
        <div >

          <div className ="tl-ns fw6 lh-copy f4 ma3-ns">
            <label>User Address</label>
            <label>{this.props.account}</label>
          </div>
          <div className ="tl-ns fw6 lh-copy f4 ma3-ns">
            <label>Username</label>
            <input 
              id = "username"
              type="text"
              name="username"
              className="pa2 input-reset ba bg-white-90 o-100 hover-blue w-100"
              placeholder="Username" />
          </div>
          <div className="tl-ns fw6 lh-copy f4 ma3-ns">
            <label>Password</label>
            <input
              id = "password"
              type="password"
              name="password"
              className="pa2 input-reset ba bg-white-90 o-100 hover-blue w-100"
              placeholder="Password"/>
          </div>
          <div className="tl-ns fw6 lh-copy f4 ma3-ns">
            <label>Confirm Password</label>
            <input
              id = "confirm_password"
              type="password"
              name="confirm_password"
              className="pa2 input-reset ba bg-white-90 o-100 hover-blue w-100"
              placeholder="Password"/>
          </div>
          {this.state.error && <div
               className="f4 fw6 db dark-red link dim">
               <p>{this.state.errorMessage}</p>
             </div>
          }

          <button
            type="button"
            className="f3 link dim ba bw1 ph3 pv1 mb2 dib black bg-white-90 b--black br-pill"
            onClick={this
            .submitRegister
            .bind(this)}>Submit</button>
        </div>
       </div>
    );
  }
}

export default RegisterBox;