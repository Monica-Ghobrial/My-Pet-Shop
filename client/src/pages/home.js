import React, { Component } from "react";
import {Form,Col,Row, Spinner , Card, Button } from 'react-bootstrap'
import axios from 'axios'
import {Image} from 'cloudinary-react'
import Select from 'react-select'
const cloudinaryName = process.env.REACT_APP_cloudName


class home extends Component {

    state = {
        loading: true,
        respData:{},
        displayedAds:{},
        searchType:"",
        search:""

    }

    async componentDidMount(){ 
        try{
            await axios({
                method: 'get',
                url: 'http://localhost:5000/findAllAds',
                headers: {},
                data: {}
              }).then(
              res => {
                  if (res.data.status=200){
                      console.log(res.data)
                      this.setState({loading:false , 
                        respData:res.data.data,
                        displayedAds:res.data.data})
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

    filterBy = (category,search) =>{
        this.setState({ searchType: category})
        this.setState({ search: search})
        let ads = this.state.respData
        let display = []
        if (category==="All"){
            for (let i=0;i<ads.length;i++){
                if ( (ads[i].title).toLowerCase().includes(search)){
                    display = display.concat(ads[i])
                }
            }
        }else{
            for (let i=0;i<ads.length;i++){
                if ( (ads[i].mainCategory.includes(category)) && (ads[i].title).toLowerCase().includes(search)){
                    display = display.concat(ads[i])
                }
            }
        }
        
        this.setState({displayedAds:display})
    }
     
    render() {
       
        return (
            this.state.loading ? <div className='App'><Spinner animation='border' variant='primary' /></div> :
            <React.Fragment >
                <Form onSubmit={this.submitData}>
                <Card >
                <Col md={{offset:0,span:12}}>
                <Row style={{height: .03*window.innerHeight + 'px'}} />

                    <Row >
                    <Col md={12}>
                    <Card.Header style={{backgroundColor:"#000"}}>
                    <Row>
                        <Form.Group as={Col} md={{offset:8,span:2}}>
                            <Form.Label className="text-white">Search by :</Form.Label>
                                <Select
                                                    value={this.state.searchType.value}
                                                    onChange={(e)=>{this.filterBy(e.value,this.state.search)}}
                                                    options={ [
                                                                { value: 'All', label: 'All' },
                                                                { value: 'Animals', label: 'Animals' },
                                                                { value: 'Accessories', label: 'Accessories' },
                                                                { value: 'Food', label: 'Food' },
                                                            ]}
                                />
                        </Form.Group>

                        <Form.Group as={Col} md={{offset:0,span:2}}>
                        <Form.Label className="text-white">Search :</Form.Label>
                            <Form.Control as="textarea" rows="1" placeHolder="Search ..." onChange={(e)=>{{this.filterBy(this.state.searchType,e.target.value)}}}/>
                        </Form.Group>
                    </Row>
                    </Card.Header>
                    <hr style={{
                            color: "black",
                            backgroundColor: "black",
                            height: 2,
                            width: "100%"
                        }}
                    />
                    </Col>
                    </Row>
                    <Row>
                    {
                        this.state.displayedAds.map((e,index)=>{
                            return (
                                <Col md={{offset:0,span:6}}>
                                <Card border="primary" bg="light" >
                                
                                <Row><br/></Row>
                                <Col md={12}>
                                    <Form.Row>
                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Title : </Card.Text>
                                            <Card.Text>{this.state.displayedAds[index].title} </Card.Text>
                                            </Form.Row>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Price : </Card.Text>
                                            <Card.Text>{this.state.displayedAds[index].price} </Card.Text>
                                            </Form.Row>
                                        </Col>
                                    </Form.Row>     

                                    <Form.Row>
                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Main Category : </Card.Text>
                                            <Card.Text>{this.state.displayedAds[index].mainCategory} </Card.Text>
                                            </Form.Row>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Specific Category : </Card.Text>
                                            <Card.Text>{this.state.displayedAds[index].specificCategory} </Card.Text>
                                            </Form.Row>
                                        </Col>
                                    </Form.Row>

                                    <Form.Row>
                                        <Col md={6}>
                                            <Form.Row>
                                            <Card.Text style={{fontWeight:"bold"}}>Location : </Card.Text>
                                            <Card.Text>{this.state.displayedAds[index].adsLocation} </Card.Text>
                                            </Form.Row>
                                        </Col>
                                    </Form.Row>    

                                    <Form.Row>
                                        <Col md={6}>
                                        <Image cloudName={cloudinaryName}  height="150" width="150" crop="fill"
                                         publicId={this.state.displayedAds[index].photos[0]} />
                                         </Col>
                                         <Col md={6}>
                                            <Row style={{height: .1*window.innerHeight + 'px'}} />
                                            <Button onClick={(e)=>{this.redirectToAds(this.state.displayedAds[index]._id)}}>View Ads</Button>
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

                    <Row style={{height: .035*window.innerHeight + 'px'}} />
                    
                </Col>
                </Card>
                </Form>
            </React.Fragment>
        )
      }

}


export default home;