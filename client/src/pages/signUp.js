import React, { Component } from "react";
import {Form, Button,Col,Card} from 'react-bootstrap'
import Select from "react-select"
import axios from 'axios'
import { Parallax } from "react-parallax";

const image = require('../images/dog.jpg')

class signUp extends Component {

    state = {
        firstName:"",
        lastName:"",
        phoneNumber:"",
        address:"",
        email:"",
        password:"",
        gender:"",

        showPass:""
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
            url: 'http://localhost:5000/signUp',
            headers: {},
            data: this.state
          }).then(
          res => {
              if (res.data.error){
                alert(res.data.error)
              }else{
                alert(res.data.msg)}

              }
         )
        
        
        } catch(error){
        console.log(error)
        }  

      }
    handleChange=(event)=> {
        if (event.target.name==='password'){
            this.validate(event.target.value)
        }
        this.setState({
             [event.target.name] : event.target.value
        });
      }
     
    render() {
       
        return (
            <React.Fragment>
                <Form onSubmit={this.submitData}>
                    <Parallax bgImage={image} style={{height:window.innerHeight}} >  
                    <br/><br/><br/>
                    <Col md={3}>
                    <Card bg="light" border="primary">
                    <Card.Header>
                        Sign Up
                    </Card.Header>
                    <Col md={12}>
                    <br/>
                    <Form.Row>
                        <Form.Group as={Col}  >
                            <Form.Label>First Name<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" rows="1" required onChange={(e)=>{this.setState({firstName:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}  >
                            <Form.Label>Last Name<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" rows="1" required onChange={(e)=>{this.setState({lastName:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Email<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" rows="1" required onChange={(e)=>{this.setState({email:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Password<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" type={this.state.showPass} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" data-toggle="tooltip" 
                                title="At least one capital letter , small letter , number and 8 Characters"
                                required onChange={(e)=>{this.setState({password:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Phone Number<span style={{color:"red"}}>✶</span></Form.Label>
                            <br/>
                            <Form.Control as="input" trype="tel"
                             required onChange={(e)=>{this.setState({phoneNumber:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Address<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" rows="2" required onChange={(e)=>{this.setState({address:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Gender</Form.Label>
                            <Select
                            value={this.state.gender.value}
                            onChange={(e)=>{this.setState({ gender: e.value})}}
                            options={[
                                        { value: 'Male', label: 'Male' },
                                        { value: 'Female', label: 'Female' },
                                    ]}
                            />
                              {/* <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.gender)}/> */}
                            
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
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </Parallax>
                </Form>
                
            </React.Fragment>
        )
      }

}


export default signUp;