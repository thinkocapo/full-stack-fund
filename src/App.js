import React, {Component} from 'react'
import { connect } from 'react-redux'
import Ethereum from './services/ethereum'
// vs
// mymethod() // import {mymethod} from './services/ethereum' // export defualt function mymethod () { }


// this.state = {}
// this.state = new Ethereum()
class App extends Component {
  constructor () {
    super()
    
    // Don't need compileContractsAndDeployMasterContract1File() from EthereumService... *
    // Because that was already performed
    this.ethereum = new Ethereum()
    
    //  Deploy Master Contract using a script because that only gets done once...
  }
  web3Ethereum () {
    // Thanks so much!! currentProvider is finally defined as metamask in the browser console. 
    // https://www.reddit.com/r/ethdev/comments/6wdj5q/can_someone_please_post_their_code_for_connecting/
    // window.web3 = new Web3(web3.currentProvider)
    // Detecting Metamask
    // https://github.com/ethereum/wiki/wiki/JavaScript-API#web3currentprovider
    // .givenProvider .currentProvider
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{height: "300px"}}></div>

        <div className="row">
          <div className="col-sm-6 num-players">
            <input type="numplayers" className="form-control right-side input-width pull-right" id="numplayers" placeholder="number of players"></input>
          </div>
          <div className="col-sm-6 bet">
            <input type="bet" className="form-control input-width" id="bet" placeholder="ether bet"></input>
          </div>
        </div>

        <div className="row" style={{height: "10px"}}></div>

        <div className="row">
          <div className="center-me">
            <button type="button" className="btn btn-primary btn-lg">GAMBLE</button>
          </div>
        </div>      
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {

  }
}
const actions = {}
export default connect(mapStateToProps, actions)(App)
