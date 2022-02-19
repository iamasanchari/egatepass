import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import UserProfile from './UserProfile'
import QrCodeScanResult from './QrCodeScanResult';
import QRLoadingIcon from '../imgIcons/QRLoadingIcon.gif'
export class CamScan extends Component {

  
    constructor(props) {
        super(props)
         this.state={
            result: '',
            isScanSucess:false,
            AlertMessage:'',
            InstitutionName:'',
            EntryStatusflag:0,
            isScanningInProgress:false
        }

        this.UserToken=UserProfile.getName();
    }


    handleScan = data => {
      
      if (data) {
        
        if (/^[0-9]+$/.test(data) && this.state.isScanSucess === false)
          {
             
            this.setState({isScanSucess:true, isScanningInProgress:true });
                  
            this.populateInstitutionDataFromAPI(data);
  
          }
            
         
        }
      }

      handleError = err => {
        console.error(err)
      }

      render() {
          return (
              <div className="card-body">{!this.UserToken ? 'You are Not Logged in ' :<div> <div>
                  {!this.state.isScanSucess ?
                  
                  this.state.isScanningInProgress==true?<img src={QRLoadingIcon} className="img-fluid"/>:
                  
                  
                  <QrReader
                      delay={300}
                      onError={this.handleError}
                      onScan={this.handleScan}
                      style={{ width: '100%' }}
                  /> : <QrCodeScanResult EntryStatusflag={this.state.EntryStatusflag} AlertMessage={this.state.AlertMessage} InstitutionName={this.state.InstitutionName} />}


              </div>
              
              <div className="text-center p-3">
              <button className="btn btn-primary px-9" onClick={()=>{this.setState({isScanSucess:false})}}> Scan Again </button>
                             </div> </div>}</div>

          
        )
      }


      async populateInstitutionDataFromAPI(dataQrcodeval) {
     
        const rawResponse = await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/ScanQrCode?QrCodeEncrypetd='+dataQrcodeval, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':'bearer '+this.UserToken
          } 
      });
      const content = await rawResponse.json();
      
      if(content.isSuccess==true)
      {
      this.setState({ result: content.data.alertResponse,isScanSucess:true,
        AlertMessage:content.data.alertResponse,
        InstitutionName:content.data.institutionName,
        EntryStatusflag:content.data.ticketStatus,
        isScanningInProgress:false });
      }
      else{
        this.setState({ result: content.responseMessage,isScanSucess:false,isScanningInProgress:false });
      }
       
    
      };

    }

    export default CamScan;