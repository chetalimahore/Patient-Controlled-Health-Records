import React , {Component} from 'react';
import './loginStyle.css';

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      error : false ,
      errorMessage : 'Error!'
    };
  }

  submitLogin(e) {

    let password = document.getElementById('password').value;

    
    this.props.app.login(password,{ from: this.props.account ,  gas:3000000})
    .then((isLoggedIn) => {
      if(isLoggedIn == true){
        this.setState({error : false});
        this.props.loginChange(e);
      }
      else
      {
         this.setState({error : true, errorMessage : 'Invalid Password!'});
      }
    });

    

    
    e.preventDefault();
  }

  render() {
    if(this.state.isSuccess){
    return (
        <div>
        {`Hello World!`}
        </div>
    );
    }
    else{
      return(
        <div className="inner-container">
        <div className="f3 fw6 ph0 mh0">
          Login
        </div>
        <div>

          <div className ="tl-ns fw6 lh-copy f4 ma3-ns">
            <label >User Address </label>
            <label >{this.props.account}</label>
          </div>

          <div className="tl-ns fw6 lh-copy f4 ma3-ns">
            <label >Password</label>
            <input
              id = "password"
              type="password"
              name="password"
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
            className="f3 link grow ba bw1 ph3 pv1 mb2 dib black bg-white-90 b--black br-pill"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
        </div>
      </div>
      );
    }
  }

}

export default LoginBox;