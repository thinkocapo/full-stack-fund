import React, {Component} from 'react'
import { connect } from 'react-redux'
import Ethereum from './lib/ethereum/connection'
// import { placeBet } from './services/ethereum' // export defualt function mymethod () { }


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
    this.ethereum.placeBet({ etherBet, numPlayers })
  }

  // TODO validation of user inputs
  // onClick()
  setEtherBet(domEvent) {
    const ether = domEvent.target.value
    this.state.etherBet = Number(ether)
  }
  setNumPlayers(domEvent) {
    const numPlayers = domEvent.target.value
    this.state.numPlayers = Number(numPlayers)
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
