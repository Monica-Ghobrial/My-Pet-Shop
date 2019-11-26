import React, { Component } from "react";
import { Form , Col , Row , Card, Button , Collapse} from "react-bootstrap";
import Select from "react-select"
import axios from 'axios'
import PhoneInput from 'react-phone-number-input/input'
import { Parallax } from "react-parallax";

const image = require('../images/dog.jpg')

class signUp extends Component {

    state = {
       firstName:"",
       lastName:"",
       email:"",
       phoneNumber:"",
       address:"",
       gender:"",

    }

    validateItem=(e)=>{
        if (e===""){
          return true
        }
        return false
    }
    
    submitData =(event)=>{
        event.preventDefault();

        axios
        .post('http://localhost:5000/api/user',this.state)
        .then( (res) => {console.log(res) })
        .catch(err => alert(err.message))

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