import React, { Component } from 'react';
import imgBrandLogo from '../imgIcons/egatePassLogo.png'
export class Signup extends Component{

    constructor(props)
    {   super(props)
        this.state={
            FullName:'',
            PrimaryMobile:'',
            PrimaryMobileConfirmation:'',
            SecondaryMobile:'',
            Password:'',
            PasswordConfirmation:'',
            DateofBirth:'',
            SignupAttempted:false,
            WrongRegistrationMsg:'',
            ValidDatMessage:''
        };
    }

    validateAllUserInput()
    {
        var phonenoval = /^\d{10}$/;
        var ValidationMsgRetn='';
        var isValidationSucess=true;
        if(this.state.FullName.length<=3)
        {
            ValidationMsgRetn='Invalid Name';
            isValidationSucess=false;
        }

        if(!this.state.PrimaryMobile.match(phonenoval)|| !this.state.PrimaryMobileConfirmation.match(phonenoval))
        {
            ValidationMsgRetn='Invalid Mobile Number Provided';
            isValidationSucess=false;
        }

        if(this.state.PrimaryMobile!==this.state.PrimaryMobileConfirmation)
        {
            ValidationMsgRetn='Mobile Numbers are miss matching';
            isValidationSucess=false;
        }

        if(this.state.Password.length<5 ||this.state.Password.length<5 )
        {
            ValidationMsgRetn='Password Length Must Be Greater than 5';
            isValidationSucess=false;
            
        }

        if(this.state.Password!==this.state.PasswordConfirmation)
        {
            ValidationMsgRetn='Password Miss Match';
            isValidationSucess=false;
            
        }
        
        
        if( !this.state.SecondaryMobile.match(phonenoval) )
        {
            ValidationMsgRetn='Invalid Contact Number';
            isValidationSucess=false;
        }


        if(this.state.DateofBirth.length!==10 || this.state.ValidDatMessage.length!=0 )
        {
            ValidationMsgRetn='Invalid Date of Birth';

            isValidationSucess=false;
        }

       
        this.setState({
            WrongRegistrationMsg:ValidationMsgRetn,SignupAttempted:true
        });
       
             
        return isValidationSucess;

    }

    SubmitHander=(event)=>{
 
        var ValidationStatus=this.validateAllUserInput();

        if( ValidationStatus==true)
        {
         (async () => {
            const rawResponse = await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/UserRegistration', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ FullName: this.state.FullName, PrimaryMobile: this.state.PrimaryMobile ,SecondaryMobile:this.state.SecondaryMobile,Password:this.state.Password,DateofBirth:this.state.DateofBirth})
            });
            const content = await rawResponse.json();
            if(content.data===true)
            { 
                window.location.href="/login"
            }else{
                this.setState({
                    WrongRegistrationMsg: content.responseMessage,SignupAttempted:false
                });
            }
            
        })();

    }
    else{
        this.setState({
          SignupAttempted:false
        });
    }
  

        event.preventDefault()
    }



    FullNameChange=(event)=>{

        this.setState({
            FullName: event.target.value
        });
       
    }

    PrimaryMobileChange=(event)=>{

        this.setState({
            PrimaryMobile: event.target.value
        });
       
    }
    PrimaryMobileConfirmationChange=(event)=>{

        this.setState({
            PrimaryMobileConfirmation: event.target.value
        });
       
    }

    SecondaryMobileChange=(event)=>{

        this.setState(
            {
                SecondaryMobile:event.target.value   
            }
        );
    }
    PasswordChange=(event)=>{

        this.setState(
            {
                Password:event.target.value   
            }
        );
    }
    
    
    PasswordConfirmationChange=(event)=>{

        this.setState(
            {
                PasswordConfirmation:event.target.value   
            }
        );
    }
    
    isValidDate(dateString) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === dateString;
      }
    DateofBirthChange=(event)=>{

    
    
    var dateValidation= this.isValidDate(event.target.value)
    
    if(dateValidation===true)
    {
        this.setState(
            {
                DateofBirth:event.target.value ,ValidDatMessage:'' 
            }
        );
    }else{

        this.setState(
            {
                DateofBirth:event.target.value ,ValidDatMessage:'Invalid Date' 
            }
        );
    }

    }


    
    render(){
        const tbStyle={borderRadius:"15px"}
        const divStyleint={padding:"8px"}
        const imgStyleint={maxHeight:"39px"}
        const divStyleSubmitArea={padding:"8px",minHeight:"100px"}
        return(
            <div className="row">
                  <div className="col-sm-3 col-md-2 col-lg-3"></div>
            <div className="col-sm-6 col-md-8 col-lg-6 p-3">

<div  className="card div-round-pill-pd">
    <div className="text-center">   
    <img src={imgBrandLogo} className="img-fluid" style={imgStyleint}></img>
    <h5 className="text-center">
       <b>SIGN UP   </b> 
    </h5>
    </div>
            <form>
            
            <div className="col-sm-12" style={divStyleint}> 
            <label className="text-dark font-weight-bold"> Name </label>
                <input type="text" value={this.state.FullName} className="form-control" placeholder="Full Name" style={tbStyle}  maxLength="30" onChange={this.FullNameChange.bind(this)}/> 
            </div >

            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold">Mobile No ( username ) </label>
            <input type="text" value={this.state.PrimaryMobile} className="form-control" placeholder="Mobile No" style={tbStyle}  maxLength="10" onChange={this.PrimaryMobileChange.bind(this)}/>
            </div>

            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold">Confirm Your Mobile No (Same as Above) </label>
            <input type="text" value={this.state.PrimaryMobileConfirmation} className="form-control" placeholder="Confirm mobile No" style={tbStyle} maxLength="10"  onChange={this.PrimaryMobileConfirmationChange.bind(this)}/>
            </div>
            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold">Alternative Contact No ( Family or friends ) </label>
            <input type="text" value={this.state.SecondaryMobile} className="form-control" placeholder="Contact No" style={tbStyle}  maxLength="10"  onChange={this.SecondaryMobileChange.bind(this)}/>
            </div>

            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold">Password </label>
            <input type="password" value={this.state.Password} className="form-control" placeholder="Password" style={tbStyle} maxLength="30"  onChange={this.PasswordChange.bind(this)}/> 
            </div>

            <div className="col-sm-12"   style={divStyleint}>
            <label className="text-dark  font-weight-bold">Confirm password </label>
            <input type="password" value={this.state.PasswordConfirmation} className="form-control" placeholder="Confirm password" style={tbStyle} maxLength="30"  onChange={this.PasswordConfirmationChange.bind(this)}/>
            </div>

            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold">Your Date Of Birth </label>
            <input type="date" value={this.state.DateofBirth} className="form-control" placeholder="DOB in YYYY-MM-dd Format " style={tbStyle} maxLength="10"  onChange={this.DateofBirthChange.bind(this)}/>
        <span className="text-danger">{this.state.ValidDatMessage}</span>

            </div>
            {
                                this.state.WrongRegistrationMsg!=''?
                              
                              <div className="col-sm-12"><span className="badge badge-pill badge-danger p-2"> {this.state.WrongRegistrationMsg} </span></div>  :''
                            }

            <div className="col-sm-12"  style={divStyleSubmitArea}>

            {this.state.SignupAttempted? <button className="btn btn-primary float-right btn-roundEdge" disabled>
  <span className="spinner-border spinner-border-sm"></span>
   Signup...
</button> :

            <input type="submit" value="Signup" className="btn btn-primary float-right btn-roundEdge" onClick={this.SubmitHander.bind(this)} />
           }   


 
          
           </div>
            
            </form>
            </div>
</div>
</div>
         );
    }

}


export default Signup;