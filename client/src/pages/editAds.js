import React, { Component } from "react";
import {Form,Col,Row, Button } from 'react-bootstrap'
import Select from "react-select"
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {Image} from 'cloudinary-react'
const cloudinaryName = process.env.REACT_APP_cloudName


class editAds extends Component {

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
        respData:{photos:[]},
        deleteCheck:true,
    }

    async componentDidMount(){
        const storedToken = localStorage.getItem('jwtToken')
        const str = storedToken.replace('Bearer ', '')
        const token = jwt.decode(str)
        this.setState({sellerID:token.id})
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
                      this.setState({loading:false , respData:res.data.data,
                        sellerID:token.id,
                        title:res.data.data.title,
                        mainCategory:res.data.data.mainCategory,
                        specificCategory:res.data.data.specificCategory,
                        description:res.data.data.description,
                        images: res.data.data.images,
                        adsLocation:res.data.data.adsLocation,
                        price:res.data.data.price,
                        negotiable:res.data.data.negotiable,})
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

    setImage=(e)=>{
        this.setState({images:[... this.state.images,e]})
    }

    submitData =(event)=>{
        event.preventDefault();
        console.log(this.state.images)
        try{
        axios({
            method: 'put',
            url: 'http://localhost:5000/editAds/'+this.props.match.params.adsId,
            headers: {},
            data: this.state
          }).then(
          res => {
              if (res.status===200){
                  alert(res.data.msg)
                window.location.assign('http://localhost:3000/myads')}
            }
         )
        
        
        } catch(error){
        console.log(error)
        }  

      }
    deptDefault=(e)=>{
        return { value: e , label: e }
    }
    
    async approveDelete(){
        await axios({
            method: 'delete',
            url: 'http://localhost:5000/deleteAds/'+this.props.match.params.adsId,
            headers: {},
            data: {}
          }).then(
          res => {
              if (res.data.status=200){
                  alert("Your ads is deleted Succefully")
                  window.location.assign('http://localhost:3000/myads')
              }
          }
         )
    }
     
    render() {
       let data = this.state.respData
        return (
            <React.Fragment >
                <Form onSubmit={this.submitData}>
                <Col md={12}>
                <Col md={{offset:2,span:10}}>
                <Row style={{height: .03*window.innerHeight + 'px'}} />

                    <Row  >
                    <Col md={10}>
                    <Form.Label style={{ color:"black" , fontSize:"18px" , fontWeight:"bold" }}>Edit your Ads</Form.Label>
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
                            <Form.Control as="textarea" rows="1" onChange={(e)=>{this.setState({title:e.target.value})}} placeHolder={this.state.title}/> 
                            <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.title)}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={{offset:2,span:3}}>
                            <Form.Label>Main Category <span style={{color:"red"}}>✶</span> : {this.state.mainCategory} </Form.Label>
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
                            <Form.Control as="textarea" rows="1" onChange={(e)=>{this.setState({specificCategory:e.target.value})}} placeHolder={this.state.specificCategory}/>
                            <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.specificCategory)}/>
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
                            <Form.Control as="textarea" rows="4" onChange={(e)=>{this.setState({description:e.target.value})}} placeHolder={this.state.description}/>
                            <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.description)}/>
                        </Col>
                    </Row>
                    
                    <br/>
                    <Row>
                        <Col md={{offset:2,span:3}}>
                            <Form.Label>Price <span style={{color:"red"}}>✶</span></Form.Label>
                            <Form.Control as="input" type="number" rows="1" placeHolder={this.state.price} onChange={(e)=>{this.setState({price:e.target.value})}} />
                            <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.price)}/>
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
                    <Form.Label style={{color:"red"}}><span style={{color:"black"}}>✶</span>Sorry , you can't edit photos</Form.Label>
                    <Row>
                        {
                            this.state.respData.photos.map((e,index)=>{
                                return (
                                    <Col md={{offset:0,span:4}}>
                                        <Image cloudName={cloudinaryName}  height="150" width="200"  radius="60"
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
                            <Form.Control as="textarea" rows="1" onChange={(e)=>{this.setState({adsLocation:e.target.value})}} placeHolder={this.state.adsLocation} />
                            <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }}
                                required={this.validateItem(this.state.adsLocation)}/>
                        </Col>
                    </Row>
                    
                    <Row style={{height: .035*window.innerHeight + 'px'}} />
                    <Form.Row>
                    <Form.Group as={Col} md={{offset:0,span:1}}>
                        <Button variant="danger" disabled={this.state.deleteCheck} onClick={(e)=>this.approveDelete()}>DELETE Ads</Button>
                        </Form.Group>
                        <Col md={{offset:0,span:6}}>
                        <Form.Check id="delete"
                            custom={true}
                            inline={true}
                            label="By check you are approve on deleting this Ads from yours in a way that it can't be retrieved again"
                            onChange={(e)=>{this.setState({deleteCheck:!e.target.checked})}}/>
                        </Col>
                        

                       
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={{offset:4}}>
                        <Button  type="submit">Save</Button>
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


export default editAds;