import React, {Component} from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home'
import AboutMe from './components/about-me'
import Portfolio from './components/portfolio'
import Links from './components/links'

// const App = ({ message = 'Hello Starter App!' }) => (
//   <Button bsStyle='primary' bsSize='large'>{message}</Button>
// )

// App.propTypes = {
//   message: React.PropTypes.string
// }

class App extends Component {
  render() {
    return (
      <p>
        <button type="button" className="btn btn-primary btn-lg">GAMBLE</button>
      </p>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {

  }
}
const actions = {}
export default connect(mapStateToProps, actions)(App)
