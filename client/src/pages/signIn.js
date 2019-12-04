import React, { Component } from "react";
import {Form,InputGroup, Button,ButtonGroup,FormControl,Col,Row, Container,Card} from 'react-bootstrap'
import Select from "react-select"
import axios from 'axios'
import PhoneInput from 'react-phone-number-input/input'
import { Parallax } from "react-parallax";
import { sign } from "crypto";

const image = require('../images/dog.jpg')


const sectionStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(../images/dog.jpg)`
  };

class signIn extends Component {

    state = {
        email:"",
        password:"",
    }

    componentDidMount(){
        localStorage.removeItem("jwtToken")
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
    
    
    submitData =(event)=>{
        event.preventDefault();
        
        try{
        axios({
            method: 'post',
            url: 'http://localhost:5000/signIn',
            headers: {},
            data: this.state
          }).then(
          res => {localStorage.setItem('jwtToken', res.data.data);}
         ) 
        } catch(error){
        console.log(error)
        }

      }
   
     
    render() {
       
        return (
            <React.Fragment >
                <Form onSubmit={this.submitData}>
                    <Parallax bgImage={image} style={{height:window.innerHeight}} >  
      
                    <br/><br/><br/>
                    <Col md={{span:4,offset:3}}>
                    <Col md={{span:8,offset:5}}>
                    <Card bg="light" border="primary">
                    <Card.Header>
                        Sign In
                    </Card.Header>
                    <Col md={12}>
                    <br/>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Email<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" rows="1" required onChange={(e)=>{this.setState({email:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Password<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" type={this.state.showPass} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  
                                required onChange={(e)=>{this.setState({password:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>                    

                    <br/>
                    <Form.Row>
                        <Form.Group as={Col} md={{offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Form.Group>
                    </Form.Row>
                    <br/>
                </Col>
                </Card>
                </Col>
                </Col>
                {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
                </Parallax>
                </Form>
            </React.Fragment>
        )
      }

}


export default signIn;