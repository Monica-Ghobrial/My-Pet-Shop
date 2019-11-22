import React, { Component } from "react";
import { Form , Col , Row , Card, Button , Collapse} from "react-bootstrap";
//import Select from "react-select"



class signUp extends Component {

    state = {
       firstName:"",
       lastName:"",
       phoneNumber:"",
       emaai:"",
       address:"",
       gender:"",

    }

    validateItem=(e)=>{
        if (e===""){
          return true
        }
        return false
      }
     
      render() {
       
        return (
            <React.Fragment>
                <Form>
                <Col md={3}>
                <Card border="secondary">
                <Col md={12}>
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
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({phoneNumber:e.target.value})}} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId=">CustomerType" >
                            <Form.Label>Gender</Form.Label>
                           {/* <Select
                           value={this.state.gender.value}
                           onChange={(e)=>{this.setState({ gender: e.value})}}
                           options={[
                                       { value: 'Male', label: 'Male' },
                                       { value: 'Female', label: 'Female' },
                                   ]}
                           /> */}
                              {/* <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.gender)}/> */}
                            
                        </Form.Group>
                    </Form.Row>

                </Col>
                </Card>
                </Col>
                </Form>
                
            </React.Fragment>
        )
      }

}


export default signUp;