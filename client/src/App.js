import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import PrivateRoute from './privateRoute'
import Verify from './pages/verify'
import setAuthToken from './auth'
import Navbar from './pages/navBar'
import NewAds from './pages/newAds'
import MyAds from './pages/myAds'
import ViewAds from './pages/viewAds'
import EditAds from './pages/editAds'
import Home from './pages/home'
if (localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
}

class App extends Component {
  render(){
    return (
  //    <div style={{  'overflowX':'hidden' }}>
      <Router>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
          integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
          crossOrigin='anonymous' />
        <Route path='/' component={Navbar}/>
        <Switch>
          <Route exact path='/signUp' component={SignUp} />
          <Route exact path='/signIn' component={SignIn} />
          <Route exact path='/verify/:token' component={Verify} />
          <Route exact path='/ads/:adsId' component={ViewAds} />
          <Route exact path='/editAds/:adsId' component={EditAds} />
          <Route exact path='/home' component={Home} />
          <PrivateRoute exact path='/newAds' component={NewAds} />
          <PrivateRoute exact path='/myAds' component={MyAds} />
          <PrivateRoute exact path='/try' component={"WELCOME"}/>
        
        </Switch>


      </Router>
    //</div>
    );
  }
}

export default App;
