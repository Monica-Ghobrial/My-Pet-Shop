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
                        <Form.Group as={Col} >
                            <Form.Label>Phone Number<span style={{color:"red"}}>✶</span></Form.Label>
                            <br/>
                            <PhoneInput
                            required
                            placeholder="Enter phone number"
                            country="EG"
                            value={ this.state.phoneNumber }
                            onChange={ (phoneNumber) => this.setState({ phoneNumber }) }/>
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