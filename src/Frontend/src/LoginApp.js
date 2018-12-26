import React , {Component} from 'react';
import ReactDom from 'react-dom';
import './loginStyle.css';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import Home from './Home';


class LoginApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      isLoginSuccessful: false,
      isViewGrantList : false,
      isAccessGrantList : false,
      userName : ''
    };
  }

  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }

  onSuccessfulLogin(event)
  {

    this.props.app.getName({ from: this.props.account ,  gas:3000000})
    .then( (name) =>{
      this.setState({isLoginSuccessful: true, userName : name});
    })
        
  }

  logoutFunction = (event) =>
  {
    this.setState({isLoginSuccessful : false, isLoginOpen: true, isRegisterOpen: false});
  }

  render() {
    if(this.state.isLoginSuccessful){

      return (
          <Home LoggedOut = {this.logoutFunction} app = {this.props.app} account = {this.props.account} userName = {this.state.userName}/>
        );
    }
    else
     {
      return (
      <div>
        <section className="mw5 mw7-ns center pa3 ph5-ns tc">
         <div
           className="f3-ns link grow ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill"
           onClick={this
           .showLoginBox
           .bind(this)}>
           Login
         </div>
         <div
           className="f3-ns link grow ba bw2 ph4 pv1 mb2 dib black ma3 bg-white-90 br-pill"
           onClick={this
           .showRegisterBox
           .bind(this)}>
           Register
         </div>

        <div className="tc box-container ba bg-washed-blue">
          {this.state.isLoginOpen && <LoginBox app = {this.props.app} loginChange = {this.onSuccessfulLogin.bind(this)} account = {this.props.account}/>}
          {this.state.isRegisterOpen && <RegisterBox app = {this.props.app} loginChange = {this.onSuccessfulLogin.bind(this)} account = {this.props.account}/>}
        </div>

      </section>
    </div>
     
    );
    }
    
  }
}




export default LoginApp;