import React, { Component } from "react";
import {Form,InputGroup, Button,ButtonGroup,FormControl,Col,Row, Container,Card} from 'react-bootstrap'
import Select from "react-select"
import axios from 'axios'
import PhoneInput from 'react-phone-number-input/input'
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
            
        password:"",
        confirmPassword:"",
        type1: 'password',
        type2: 'password',
        lowerCase:"text-danger",
        upperCase:"text-danger",
        number:"text-danger",
        minimum:"text-danger",
        confirmed:"text-danger",
        lowerCaseText:"✖ LowerCase",
        upperCaseText:"✖ UpperCase",
        numberText:"✖ Number",
        minimumText:"✖ Minimum Length 8",
        confirmedText:"✖ Match",
        passwordFlag:true,
        matchFlag:true,
    }

    validateItem=(e)=>{
        if (e===""){
          return true
        }
        return false
    }

    validate =(e)=>{
        const pass = e
        this.setState({password1:pass})
        this.match1(this.state.confirmPassword1,pass)
            const lowerCaseLetters = /[a-z]/g;
            const upperCaseLetters = /[A-Z]/g;
            const numbers = /[0-9]/g;
    
            if (lowerCaseLetters.test(pass)){
                this.setState({lowerCase:"text-success"})  
                this.setState({lowerCaseText:"✔ LowerCase"})
            }else{
                this.setState({lowerCase:"text-danger"})
                this.setState({lowerCaseText:"✖ LowerCase"})        
            }
    
            if (upperCaseLetters.test(pass)){
                this.setState({upperCase:"text-success"})
                this.setState({upperCaseText:"✔ UpperCase"})            
            }else{
                this.setState({upperCase:"text-danger"})
                this.setState({upperCaseText:"✖ UpperCase"})            
            }
    
            if (pass.length>7){
                this.setState({minimum:"text-success"})
                this.setState({minimumText:"✔ Minimum Length 8"})            
           }else{
               this.setState({minimum:"text-danger"})
               this.setState({minimumText:"✖ Minimum Length 8"})            
           }
    
            if (numbers.test(pass)){
                this.setState({number:"text-success"})
                this.setState({numberText:"✔ Number"})    
            }else{
                this.setState({number:"text-danger"})    
                this.setState({numberText:"✖ Number"})
            }
    
      }
      
      match=(e)=>{
        const pass = e.target.value
        this.setState({confirmPassword:pass})
        if (pass===this.state.password1){
            this.setState({confirmed:"text-success"})
            this.setState({confirmedText:"✔ Match"})
            this.setState({matchFlag:false}) 
        }else{
            this.setState({confirmed:"text-danger"})    
            this.setState({confirmedText:"✖ Match"})
            this.setState({matchFlag:true}) 
        }
      }
    
      match1(pass,x){
        if (pass===x){
            this.setState({confirmed:"text-success"})
            this.setState({confirmedText:"✔ Match"}) 
            this.setState({matchFlag:false}) 
          }else{
            this.setState({confirmed:"text-danger"})    
            this.setState({confirmedText:"✖ Match"})
            this.setState({matchFlag:true}) 
        }
      }
    
      handleClick1 = () => this.setState(({type1}) => ({
        type1: type1 === 'text' ? 'password' : 'text'
      }))
    
      handleClick2 = () => this.setState(({type2}) => ({
        type2: type2 === 'text' ? 'password' : 'text'
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
          res => {alert(res.data.msg)}
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
                    <Parallax bgImage={image} strength={-100}>  
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
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({firstName:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}  >
                            <Form.Label>Last Name<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({lastName:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Email<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({email:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <InputGroup className="mb-3">    
                    <Form.Label>Password</Form.Label>
                    <FormControl type={this.state.type1} placeholder="Enter your new password" ref="psw" 
                        onChange = {(e)=>{this.handleChange(e)}} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" name ="password" required
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
                    <InputGroup.Append>
                    <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick1} />
                    </InputGroup.Append>
                    </InputGroup>
                    </Form.Row>

                    <Form.Row>
                    <Col md={{ span: 0, offset: 1 }}>
                    <p className={this.state.lowerCase} >{this.state.lowerCaseText}</p>
                    </Col>
                    <Col md={{ span: 0, offset: 3 }}>
                    <p className={this.state.upperCase}>{this.state.upperCaseText}</p>
                    </Col>            
                    </Form.Row>
                    <Form.Row>
                    <Col md={{ span: 0, offset: 1 }}>
                        <p className={this.state.minimum}>{this.state.minimumText}</p>          
                    </Col>
                    <Col md={{ span: 0, offset: 1 }}>
                    <p className={this.state.number}>{this.state.numberText}</p>          
                    </Col>       
                    </Form.Row>

                    

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Phone Number<span style={{color:"red"}}>✶</span></Form.Label>
                            <br/>
                            <input type="tel"
                             required onChange={(e)=>{this.setState({phoneNumber:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Address<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="2" required onChange={(e)=>{this.setState({address:e.target.value})}} />
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