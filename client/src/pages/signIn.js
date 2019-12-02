import React, { Component } from "react";
import { Form , Col , Row , Card, Button , Collapse} from "react-bootstrap";
import Select from "react-select"
import axios from 'axios'
import PhoneInput from 'react-phone-number-input/input'
import { Parallax } from "react-parallax";

const image = require('../images/dog.jpg')

class signUp extends Component {

    state = {
        email:"",
        password:""
    }

    validateItem=(e)=>{
        if (e===""){
          return true
        }
        return false
    }
    
    submitData =(event)=>{
        event.preventDefault();
        console.log(this.state)
        

      }

     
    render() {
       
        return (
            <React.Fragment>
                <Form onSubmit={this.submitData}>
                    
                </Form>
                </React.Fragment>
        )}
}


export default signUp;