import React, { Component } from 'react';
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Access from './Access/build/contracts/Access.json'
import LoginApp from './LoginApp'
import './loginStyle.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      app : {},
      account: '0x0',
    }

    if (typeof window.web3 === 'undefined') {
    // no web3, use fallback
    this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
  } else {
    // window.web3 == web3 most of the time. Don't override the provided,
    // web3, just wrap it in your Web3.
    var myWeb3 = new Web3(window.web3.currentProvider); 

    // the default account doesn't seem to be persisted, copy it to our
    // new instance
    myWeb3.eth.defaultAccount = window.web3.eth.defaultAccount;

   // callback(myWeb3);
   this.web3Provider = window.web3.currentProvider;
  }

    //this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    this.web3 = new Web3(this.web3Provider)
    this.access = TruffleContract(Access)
    this.access.setProvider(this.web3Provider)


  }

  componentDidMount() {

    this.web3.eth.getCoinbase((err, acc)=>{
      this.setState({account : acc});
      this.access.deployed().then((instance) => {
        this.app = instance;
        this.setState({app : this.app});

      });
    })
    
  }

  render() {
    return (
      <div className = "imageBg">
             <header className="black-80 tc pv4 avenir">
                 <h1 className= "mw-100-ns i items-center pa2 ph4-ns avenir b o-100 fw9">Welcome to Patient Health Records Portal!</h1>
             </header>
             <LoginApp app = {this.state.app} account = {this.state.account}/>
      </div>
    );
  }
}

export default App;