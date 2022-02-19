import React, { Component } from 'react';
import imgSucss from '../imgIcons/SuccessLoadingIcon.gif'
import imgExit from '../imgIcons/ExitLoadingIcon.gif'
export class QrCodeScanResult extends Component {
  
    constructor(props)
    {
        super(props);
       
        }
     
  render () {
      let SucessEntryContent=<div className="alert alert-success" role="alert">
      <h4 className="alert-heading">{this.props.InstitutionName}</h4>
      <p> {this.props.AlertMessage}  </p>
      <div className="img-fluid">
        <img src={imgSucss} className="img-fluid"></img>
      </div>
      <hr/> 
      <p className="mb-0"> 
      
      Cheers ! You had Entered into {this.props.InstitutionName} by scanning the pass
      <p>  Show This Result in the entry point to get in </p>
      </p>
    </div>;

let SucessExitContent=<div className="alert alert-danger" role="alert">
    <h4 className="alert-heading">{this.props.InstitutionName}</h4>
<p> {this.props.AlertMessage}  </p>
<img src={imgExit} className="img-fluid"></img>
 
<hr/> 
<p className="mb-0"> 

You had Exited From  {this.props.InstitutionName} by scanning the pass ! Cheers
</p>



</div>
      return (
      
        
          <div>
             
              {this.props.EntryStatusflag==1? SucessEntryContent :SucessExitContent } 
             
   
              
 
      </div>
    );
  }
}

export default QrCodeScanResult;
