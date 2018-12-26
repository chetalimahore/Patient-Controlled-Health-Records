import React, {Component} from 'react';
import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //alert('In change');
    this.setState({ [event.target.name]: event.target.value});
    //this.setState({password: event.target.password});
  }

  handleSubmit(event) {
    alert('Username: ' + this.state.username + 'Password: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className = 'LoginClass'>
        <label className = "User">
          Username:
          <input name = "username" type="text" username={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name = "password" type="text" password={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;