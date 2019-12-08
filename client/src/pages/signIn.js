import React, { Component } from "react";
import {Form, Button,Col,Card} from 'react-bootstrap'
import axios from 'axios'
import { Parallax } from "react-parallax";

const image = require('../images/dog.jpg')

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
          res => {
            if (res.data.msg==="success"){
                                    localStorage.setItem('jwtToken', res.data.data);
                                    window.location.assign('http://localhost:3000/home')
                                }else{
                                    alert(res.data.msg)
                                }
              
          }
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
                            <Form.Control as="input" type="password"    
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