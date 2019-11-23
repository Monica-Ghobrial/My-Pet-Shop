import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'


class App extends Component {
  render(){
    return (
      <div style={{  'overflowX':'hidden' }}>
      <Router>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
          integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
          crossOrigin='anonymous' />
        <Switch>
          <Route exact path='/signUp' component={SignUp} />
        
        </Switch>


      </Router>
    </div>
    );
  }
}

export default App;
