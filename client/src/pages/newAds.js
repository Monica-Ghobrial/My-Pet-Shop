import React, { Component } from "react";
import {Form,Col,Row, Button } from 'react-bootstrap'
import Select from "react-select"
import axios from 'axios'
import ImageUpload from '../components/viewImg'
import jwt from 'jsonwebtoken'


class newAds extends Component {

    state = {
        sellerID:"",
        title:"",
        mainCategory:"",
        specificCategory:"",
        description:"",
        images: [],
        adsLocation:"",
        price:0,
        negotiable:false,

    }

    componentDidMount(){
        const storedToken = localStorage.getItem('jwtToken')
        const str = storedToken.replace('Bearer ', '')
        const token = jwt.decode(str)
        this.setState({sellerID:token.id})
    }
    validateItem=(e)=>{
        if (e===""){
          return true
        }
        return false
    }

    setImage=(e)=>{
        this.setState({images:[... this.state.images,e]})
    }

    submitData =(event)=>{
        event.preventDefault();
        console.log(this.state.images)
        try{
        axios({
            method: 'post',
            url: 'http://localhost:5000/postAds',
            headers: {},
            data: this.state
          }).then(
          res => {alert(res.data.msg)}
         )
        
        
        } catch(error){
        console.log(error)
        }  

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
                    
                    <br/>
                    <Row>
                        <Col md={{offset:2,span:3}}>
                            <Form.Label>Price <span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" type="number" rows="1" required onChange={(e)=>{this.setState({price:e.target.value})}} />
                        </Col>
                        <Col md={{offset:0,span:3}}>
                        <Row style={{height: .035*window.innerHeight + 'px'}} />
                        <Form.Check id="negotiable"
                            custom={true}
                            inline={true}
                            label="Negotiable"
                            onChange={(e)=>{this.setState({negotiable:e.target.checked})}}/>
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
                    
                    <br/>
                    <Form.Label style={{color:"green"}}><span style={{color:"black"}}>✶</span> Ads with 3-5 photos sell 5X faster</Form.Label>
                    <Row>
                        <Col md={{offset:1,span:2}}>
                            <ImageUpload SetImages={this.setImage} />
                        </Col>
                        <Col md={{offset:1,span:2}}>
                            <ImageUpload SetImages={this.setImage} />
                        </Col>
                        <Col md={{offset:1,span:2}}>
                            <ImageUpload SetImages={this.setImage} />
                        </Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col md={{offset:1,span:2}}>
                            <ImageUpload SetImages={this.setImage} />
                        </Col>
                        <Col md={{offset:1,span:2}}>
                            <ImageUpload SetImages={this.setImage} />
                        </Col>
                        <Col md={{offset:1,span:2}}>
                            <ImageUpload SetImages={this.setImage} />
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
                        <Col md={{offset:2,span:4}}>
                            <Form.Label>Ad location <span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="textarea" rows="1" required onChange={(e)=>{this.setState({adsLocation:e.target.value})}} />
                        </Col>
                    </Row>
                    
                    <Row style={{height: .035*window.innerHeight + 'px'}} />
                    <Form.Row>
                        <Form.Group as={Col} md={{offset:4}}>
                        <Button type="submit">Submit</Button>
                        </Form.Group>
                    </Form.Row>
                    <Row style={{height: .035*window.innerHeight + 'px'}} />
                    
                </Col>

                </Col>
                </Form>
            </React.Fragment>
        )
      }

}


export default newAds;