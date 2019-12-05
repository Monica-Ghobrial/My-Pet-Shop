import React, { Component } from "react";
import axios from 'axios'
class ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: ''
      };
      this._handleImageChange = this._handleImageChange.bind(this);
    }
    

    
    _handleImageChange(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.props.SetImages(reader.result)
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img height={.1*window.innerHeight} width={.1*window.innerHeight}   src={imagePreviewUrl} />);
      }
  
      return (
        <div>
          <form onSubmit={this._handleSubmit}>
            <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this._handleImageChange} />
          </form>
          {$imagePreview}
        </div>
      )
    }
  
  }

  export default ImageUpload;