import React, { Component } from "react";
import {Navbar,Button,Col} from 'react-bootstrap'

import img from '../images/foot.jpg'

class navbar extends Component {

    state = {
      
    }
    
    redirectTo=(e)=>{
        window.location.assign('http://localhost:3000/signIn')
    }
     
    render() {
        let sig=""
        let sig2
        let num
       if (localStorage.getItem("jwtToken")){
            sig="Logout"
            sig2=true
            num=9
       }else{
           sig="Sign in"
           sig2=false
           num=6
       }
        return (
            <React.Fragment >
                 <Navbar expand="lg" bg="dark" variant="dark" > 
                    <Navbar.Brand href="#home">
                    <img
                        src={img}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    </Navbar.Brand>
                    <Navbar.Brand href="http://localhost:3000/home">Home</Navbar.Brand>
                    <Navbar.Brand href="http://localhost:3000/myads">My ADS</Navbar.Brand>
                    <Navbar.Brand href="http://localhost:3000/newads">Place Ads +</Navbar.Brand>
                    {/* <Navbar.Brand href="#home">about</Navbar.Brand> */}

                    <Col md={{offset:6}} >
                    <Col md={{offset:num}}>
                    <Button  href="http://localhost:3000/signUp" hidden={sig2}>Sign Up</Button>
                    {' '}
                    <Button onClick={(e)=>this.redirectTo(e)}>{sig}</Button>
                    </Col>
                    </Col>
                    
                </Navbar> 
            </React.Fragment>
        )
      }

}


export default navbar;