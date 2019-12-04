import React, { Component } from "react";
import {Form,Col,Row, } from 'react-bootstrap'
import Select from "react-select"



class newAds extends Component {

    state = {
        title:"",
        mainCategory:"",
        specificCategory:"",
        description:"",

    }

    validateItem=(e)=>{
        if (e===""){
          return true
        }
        return false
    }
   
     
    render() {
       
        return (
            <React.Fragment >
                <Form onSubmit={this.submitData}>
                <Col md={12}>
                <Col md={{offset:2,span:10}}>
                <Row style={{height: .03*window.innerHeight + 'px'}} />

                    <Row  >
                    <Col md={10}>
                    <Form.Label style={{ color:"black" , fontSize:"18px" , fontWeight:"bold" }}>Place an Ad</Form.Label>
                    <hr style={{
                            color: "grey",
                            backgroundColor: "grey",
                            height: 1,
                            width: "100%"
                        }}
                    />
                    </Col>
                    </Row>

                    <Row>
                        <Col md={{offset:2,span:3}}>
                            <Form.Label>Title <span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({title:e.target.value})}} />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={{offset:2,span:3}}>
                            <Form.Label>Main Category <span style={{color:"red"}}>✶</span></Form.Label>
                            <Select
                            value={this.state.mainCategory.value}
                            onChange={(e)=>{this.setState({ mainCategory: e.value})}}
                            options={[
                                        { value: 'Animals', label: 'Animals' },
                                        { value: 'Accessories', label: 'Accessories' },
                                        { value: 'Food', label: 'Food' },
                                    ]}
                            />
                              <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.mainCategory)}/>
                            
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{offset:2,span:4}}>
                            <Form.Label>Specific Category <span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({specificCategory:e.target.value})}} />
                        </Col>
                    </Row>

                    <br/>
                    <Row  >
                    <Col md={10}>
                    <hr style={{
                            color: "grey",
                            backgroundColor: "grey",
                            height: 1,
                            width: "100%"
                        }}
                    />
                    </Col>
                    </Row>

                    <Row>
                        <Col md={{offset:2,span:5}}>
                            <Form.Label>Description <span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="4" required onChange={(e)=>{this.setState({description:e.target.value})}} />
                        </Col>
                    </Row>

                </Col>

                </Col>
                </Form>
            </React.Fragment>
        )
      }

}


export default newAds;