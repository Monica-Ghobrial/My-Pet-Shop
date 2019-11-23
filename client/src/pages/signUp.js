import React, { Component } from "react";
import { Form , Col , Row , Card, Button , Collapse} from "react-bootstrap";
import Select from "react-select"
import PhoneInput from 'react-phone-number-input/input'
import SmartInput from 'react-phone-number-input/smart-input'


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
       console.log(this.state)
      }

     
    render() {
       
        return (
            <React.Fragment>
                <Form onSubmit={this.submitData}>
                <Col md={3}>
                <Card border="secondary">
                <Col md={12}>
                    <br/>
                    <Form.Row>
                        <Form.Group as={Col} md={{span:9}} >
                            <Form.Label>First Name<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({firstName:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={{span:9}} >
                            <Form.Label>Last Name<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({lastName:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={{span:9}} >
                            <Form.Label>Email<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({email:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={{span:9}} >
                            <Form.Label>Phone Number<span style={{color:"red"}}>✶</span></Form.Label>
                            <PhoneInput
                            required
                            placeholder="Enter phone number"
                            country="EG"
                            value={ this.state.phoneNumber }
                            onChange={ (e) => this.setState({ phoneNumber:e }) }/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={{span:9}} >
                            <Form.Label>Address<span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({address:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={{span:9}}>
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

                    <Form.Row>
                        <Form.Group as={Col} md={{offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Form.Group>
                    </Form.Row>
                    <br/>
                </Col>
                </Card>
                </Col>
                </Form>
                
            </React.Fragment>
        )
      }

}


export default signUp;