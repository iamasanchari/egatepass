import React, { Component } from 'react';
import UserProfile from './UserProfile';

import imgBrandLogo from '../imgIcons/egatePassLogo.png'
export class Login extends Component {
     

    constructor(props) {
        super(props)
         this.state={
            userName: '',
            Password: '',
            PhoneNoValidationmsg:'',
            WrongCredmsg:'',
            LoginAttempted:false
        }
    }


    clickHandler = (event) =>  {

      this.setState({
        LoginAttempted:true
      });
        (async () => {
            const rawResponse = await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/UserLogin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Uname: this.state.userName, Pwd: this.state.Password })
            });
            const content = await rawResponse.json();

           
            if(content.isLoginSucess===true)
            {
                UserProfile.setName(content.reponseToken);
                window.location.href="/Dash-Board"
            }else{
                this.setState({
                    WrongCredmsg: content.reponseMessage,
                    LoginAttempted:false
                });
            }
            
        })();

        event.preventDefault()
    }
    UnameChangeHandler=(event)=> {

        this.setState({
            userName: event.target.value, WrongCredmsg:''
        })

        var phoneno = /^\d{10}$/;
 
        if ((event.target.value.match(phoneno)) && event.target.value.length === 10) {
            this.setState({
                PhoneNoValidationmsg: ''
            });

        }
        else if (event.target.value.length === 10) {

            this.setState({
                PhoneNoValidationmsg: '*Invalid Mobile'
            });
        } else {
            this.setState({
                PhoneNoValidationmsg: ''
            });

        }
           

        
 
    }

    PwdChangeHandler = (event) => {

        this.setState({
            Password: event.target.value, WrongCredmsg:''
        })
    }

    render() {
        const tbStyle={borderRadius:"15px"}
        const divStyleint={padding:"8px"}
        const imgStyleint={maxHeight:"39px"}
        const divStyleSubmitArea={padding:"8px",minHeight:"100px"}
        const divStyleSpacer={minHeight:"100px"}

        return (
         
            <div className="row">
                  <div className="col-sm-12" style={divStyleSpacer} >

</div>
            <div className="col-sm-4 col-md-3 col-lg-4"></div>
      <div className="col-sm-4 col-md-6 col-lg-4">

<div  className="card div-round-pill-pd">
<div className="text-center">   
<img src={imgBrandLogo} className="img-fluid" style={imgStyleint}></img>
<h5 className="text-center">
 <b>Login  Now   </b> 
</h5>
</div> 
                <form className="p-4">
<p>

    <label>Mobile No</label>
                 <input type="text" className="form-control" placeholder="Your 10 digit Mobile No" value={this.state.userName} onChange={this.UnameChangeHandler.bind(this)} maxLength="10" style={tbStyle} />
                <span className="text-danger float-right">  {this.state.PhoneNoValidationmsg}</span>   
                </p>
                <p>
                      <input type="password" className="form-control" placeholder="Password" value={this.state.Password} onChange={this.PwdChangeHandler.bind(this)} style={tbStyle}  maxLength="30" />               
                   
                     </p>
                    <div style={divStyleSubmitArea}>     
                    
                     {this.state.LoginAttempted? <button class="btn btn-info btn-roundEdge float-right" disabled  style={tbStyle}>
  <span class="spinner-border spinner-border-sm"></span>
  Loading..
</button> :
                    <input type="submit"  className="btn btn-info btn-roundEdge float-right" onClick={this.clickHandler.bind(this)} style={tbStyle} value="Login"/>  

                }
                              </div>
                              {
                                this.state.WrongCredmsg!=''?
                              
                              <div className="col-sm-12 text-center"><span className="badge badge-pill badge-danger"> {this.state.WrongCredmsg} </span></div>  :''
                            }
                </form>
                </div>
</div>
</div>

                
        );
    }

      
}
