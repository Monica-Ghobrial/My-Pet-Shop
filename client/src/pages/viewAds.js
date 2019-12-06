import React, { Component } from "react";
import {Form,Col,Row } from 'react-bootstrap'
import axios from 'axios'
import {Image} from 'cloudinary-react'
const cloudinaryName = process.env.REACT_APP_cloudName

class viewAds extends Component {

    state = {
        respData:{photos:[]},
        loading:true
    }

    async componentDidMount(){        
        try{
            await axios({
                method: 'get',
                url: 'http://localhost:5000/viewAds/'+this.props.match.params.adsId,
                headers: {},
                data: {}
              }).then(
              res => {
                  if (res.data.status=200){
                      console.log(res.data)
                      this.setState({loading:false , respData:res.data.data})
                  }
              }
             )
            
            } catch(error){
            console.log(error)
            }  
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
                    <Form.Label style={{ color:"black" , fontSize:"20px" , fontWeight:"bold" }}><span style={{color:"blue"}}> {this.state.respData.title} </span></Form.Label>
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
                        <Col md={{offset:1,span:3}}>
                            <Form.Label><span style={{color:"blue"}}>Main Category : </span> {this.state.respData.mainCategory} </Form.Label>
                        </Col>
                        <Col md={{offset:2,span:4}}>
                            <Form.Label><span style={{color:"blue"}}>Specific Category : </span>{this.state.respData.specificCategory}</Form.Label>
                        </Col>
                    </Row>

                    <Row  >
                    <Col md={10}>
                    <hr style={{
                            color: "grey",
                            backgroundColor: "grey",
                            height: .1,
                            width: "100%"
                        }}
                    />
                    </Col>
                    </Row>

                    <Row>
                        <Col md={{offset:1,span:6}}>
                            <Form.Label><span style={{color:"blue"}}>Description : </span>{this.state.respData.description}</Form.Label>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={{offset:1,span:2}}>
                            <Form.Label><span style={{color:"blue"}}>Price : </span>{this.state.respData.price}</Form.Label>
                        </Col>
                        <Col md={{offset:0,span:3}}>
                        <Form.Check id="negotiable"
                            custom={true}
                            inline={true}
                            label="Negotiable"
                            checked={this.state.respData.negotiable}/>
                        </Col>
                    </Row>

                    <Row  >
                    <Col md={10}>
                    <Form.Label style={{ color:"black" , fontSize:"18px" , fontWeight:"bold" }}><span style={{color:"black"}}> Contact Info </span></Form.Label>
                    <hr style={{
                            color: "grey",
                            backgroundColor: "grey",
                            height: .1,
                            width: "100%"
                        }}
                    />
                    </Col>
                    </Row>

                    <Row>
                        <Col md={{offset:1,span:8}}>
                            <Form.Label><span style={{color:"blue"}}>Ad location : </span> {this.state.respData.adsLocation} </Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{offset:1,span:8}}>
                            <Form.Label><span style={{color:"blue"}}>Phone number : </span> 0{this.state.respData.seller_phoneNumber} </Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{offset:1,span:8}}>
                            <Form.Label><span style={{color:"blue"}}>Email : </span> {this.state.respData.seller_email} </Form.Label>
                        </Col>
                    </Row>

                    
                    <Row  >
                    <Col md={10}>
                    <hr style={{
                            color: "grey",
                            backgroundColor: "grey",
                            height: .1,
                            width: "100%"
                        }}
                    />
                    </Col>
                    </Row>
                    
                    
                        <Row>
                        {
                            this.state.respData.photos.map((e,index)=>{
                                return (
                                    <Col md={{offset:0,span:6}}>
                                        <Image cloudName={cloudinaryName}  height="300" width="400"  radius="60"
                                         publicId={this.state.respData.photos[index]} >
                                         </Image>
                                    <br/>
                                    <br/>
                                    </Col>
                                    
                                )
                            }
                            )
                        }
                        </Row>
                    

                    
                </Col>

                </Col>
                </Form>
            </React.Fragment>
        )
      }

}


export default viewAds;