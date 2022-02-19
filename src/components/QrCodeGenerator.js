import React, { Component } from 'react';
import { render } from 'react-dom';
import UserProfile from './UserProfile';
import QRCode from'qrcode.react';
export class QrCodeGenerator extends Component {
   
  constructor(props) {
    super(props);
    this.UserToken=UserProfile.getName();
    this.state={ApiInstListCreated:[],loading: true};
  }
  render () {
   
    var GenerationVal=this.props.value.toString();
    const downloadQR = (value) => { 
      
    const canvas = document.getElementById(value);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = value+'img.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink); }
      return (
        
       <div>
<div>
       <QRCode value= {this.props.value} id={'VxDwn-'+this.props.value} size={190}/>
       </div>
       <div>

        <a onClick={() => downloadQR('VxDwn-'+this.props.value)} className="btn btn-sm btn-outline-warning text-dark">  Download QR Code </a>
                  </div>
     
      </div>
    );
  }
}
export default QrCodeGenerator;