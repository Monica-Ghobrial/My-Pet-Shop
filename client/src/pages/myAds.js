import React, { Component } from "react";
import {Form,Col,Row, Spinner , Card, Button } from 'react-bootstrap'
import axios from 'axios'
import {Image} from 'cloudinary-react'
import jwt from 'jsonwebtoken'
const cloudinaryName = process.env.REACT_APP_cloudName


class myAds extends Component {

    state = {
        loading: true,
        respData:{},
    }

    async componentDidMount(){ 
        const storedToken = localStorage.getItem('jwtToken')
        const str = storedToken.replace('Bearer ', '')
        const token = jwt.decode(str)
        this.setState({sellerID:token.id})
        try{
            await axios({
                method: 'post',
                url: 'http://localhost:5000/findmyads',
                headers: {},
                data: {sellerID:token.id}
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
    
    redirectToAds=(adsId)=>{
        window.location.assign('http://localhost:3000/ads/'+adsId)
    }

    redirectToEditAds=(adsId)=>{
        window.location.assign('http://localhost:3000/editAds/'+adsId)
    }
     
    render() {
       
        return (
            this.state.loading ? <div className='App'><Spinner animation='border' variant='primary' /></div> :
            <React.Fragment >
                <Form onSubmit={this.submitData}>
                <Col md={12}>
                <Col md={{offset:2,span:10}}>
                <Row style={{height: .03*window.innerHeight + 'px'}} />

                    <Row  >
                    <Col md={10}>
                    <Form.Label style={{ color:"black" , fontSize:"18px" , fontWeight:"bold" }}>My Ads</Form.Label>
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
                    {
                        this.state.respData.map((e,index)=>{
                            return (
                                <Col md={{offset:0,span:5}}>
                                <Card border="primary" bg="light" >
                                
                                <Row><br/></Row>
                                <Col md={12}>
                                    <Form.Row>
                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Title : </Card.Text>
                                            <Card.Text>{this.state.respData[index].title} </Card.Text>
                                            </Form.Row>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Price : </Card.Text>
                                            <Card.Text>{this.state.respData[index].price} </Card.Text>
                                            </Form.Row>
                                        </Col>
                                    </Form.Row>     

                                    <Form.Row>
                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Main Category : </Card.Text>
                                            <Card.Text>{this.state.respData[index].mainCategory} </Card.Text>
                                            </Form.Row>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Specific Category : </Card.Text>
                                            <Card.Text>{this.state.respData[index].specificCategory} </Card.Text>
                                            </Form.Row>
                                        </Col>
                                    </Form.Row>

                                    <Form.Row>
                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Location : </Card.Text>
                                            <Card.Text>{this.state.respData[index].adsLocation} </Card.Text>
                                            </Form.Row>
                                        </Col>
                                    </Form.Row>    

                                    <Form.Row>
                                        <Col md={6}>
                                        <Image cloudName={cloudinaryName}  height="150" width="150" crop="fill"
                                         publicId={this.state.respData[index].photos[0]} />
                                         </Col>
                                         <Col md={6}>
                                            <Row style={{height: .1*window.innerHeight + 'px'}} />
                                            <Button onClick={(e)=>{this.redirectToAds(this.state.respData[index]._id)}}>View Ads</Button>{' '}
                                            <Button onClick={(e)=>{this.redirectToEditAds(this.state.respData[index]._id)}}>Edit Ads</Button>
                                         </Col>
                                    </Form.Row>

                                    
                                </Col>
                                <Row><br/></Row>
                                </Card>
                                
                                <br/>
                                </Col>
                                
                            )
                        }
                        )
                    }
                    </Row>
                    <Row>
                    </Row>
                    <Row style={{height: .035*window.innerHeight + 'px'}} />
                    
                </Col>

                </Col>
                </Form>
            </React.Fragment>
        )
      }

}


export default myAds;