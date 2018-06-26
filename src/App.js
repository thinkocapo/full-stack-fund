import React, {Component} from 'react'
import { connect } from 'react-redux'
import Ethereum from './services/ethereum'
// vs
// mymethod() // import {mymethod} from './services/ethereum' // export defualt function mymethod () { }
// Thanks so much!! currentProvider is finally defined as metamask in the browser console. 
// https://www.reddit.com/r/ethdev/comments/6wdj5q/can_someone_please_post_their_code_for_connecting/
// window.web3 = new Web3(web3.currentProvider)
// Detecting Metamask
// https://github.com/ethereum/wiki/wiki/JavaScript-API#web3currentprovider
// .givenProvider .currentProvider


class App extends Component {
  // MasterContract was already deployed by setup-ethereum-react.js, no need for end user to do this every time they load this webpage
  constructor () {
    super()
    this.state = {
      etherBet: '',
      numPlayers: ''
    }
    this.ethereum = new Ethereum() // methods only for interacting with existing contracts
    this.placeBet = this.placeBet.bind(this)
    this.setEtherBet = this.setEtherBet.bind(this)
    this.setNumPlayers = this.setNumPlayers.bind(this)
  }

  placeBet(domEvent) {
    const { etherBet, numPlayers } = this.state
    console.log('GAMBLE...', { etherBet, numPlayers })
  }

  // TODO validation of user inputs
  // onClick()
  setEtherBet(domEvent) {
    const ether = domEvent.target.value
    this.state.etherBet = ether
  }
  setNumPlayers(domEvent) {
    const numPlayers = domEvent.target.value
    this.state.numPlayers = numPlayers
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{height: "300px"}}></div>

        <div className="row">
          <div className="col-sm-6 bet">
            <input onChange={this.setEtherBet} name="etherBet" placeholder="ether bet amount" type="bet" className="form-control center-text input-width pull-right" id="bet" ></input>
          </div>
          <div className="col-sm-6 num-players">
            <input onChange={this.setNumPlayers} name="numPlayers" placeholder="number of players" type="numplayers" className="form-control center-text input-width" id="numplayers"></input>
          </div>
        </div>

        <div className="row" style={{height: "10px"}}></div>

        <div className="row">
          <div className="center-me">
            <button onClick={this.placeBet} type="button" className="btn btn-primary btn-lg">GAMBLE</button>
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
