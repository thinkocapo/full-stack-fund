import React, {Component} from 'react'
import { connect } from 'react-redux'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
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
