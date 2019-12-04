import React, { Component } from "react";
import {Form,Alert,Col,Row, } from 'react-bootstrap'
import Select from "react-select"
import axios from 'axios'
import PhoneInput from 'react-phone-number-input/input'
import { Parallax } from "react-parallax";
import { sign } from "crypto";

const image = require('../images/doggy.jpg')



class signIn extends Component {

    state = {
        email:"",
        password:"",
    }

    validateItem=(e)=>{
        if (e===""){
          return true
        }
        return false
    }
    
    handleClick1 = () => this.setState(({showPass}) => ({
        showPass: showPass === 'text' ? 'password' : 'text'
      }))
    
    componentWillMount(){
        try{
            console.log(this.props.match.params.token)
            axios({
                method: 'get',
                url: 'http://localhost:5000/verify/'+this.props.match.params.token,
                headers: {},
                data: this.state
              }).then(
              res => {console.log(res)}
             ) 
            } catch(error){
            console.log(error)
            }  
    }
    
    submitData =(event)=>{
        event.preventDefault();
        
       

      }
   
     
    render() {
       
        return (
            <React.Fragment >
                <Form onSubmit={this.submitData}>
                <Parallax bgImage={image} style={{height:window.innerHeight}} >        
                <Col md={12}>
                <Row style={{height: .65*window.innerHeight + 'px'}} />
                    <Col md={{offset:3}}>
                    <Col md={5}>
                    <Alert key={1} variant="dark">
                        Congratulations your account is activated now , please click on {' '}
                        <Alert.Link href="http://localhost:3000/signin">LOGIN</Alert.Link>{' '}to enjoy your experience .
                    </Alert>  
                    </Col>
                    </Col>
                </Col>
                </Parallax>
                </Form>
            </React.Fragment>
        )
      }

}


export default signIn;