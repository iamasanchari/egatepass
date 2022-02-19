 import React, { Component } from 'react';
 import UserProfile from './UserProfile';
 export class InstitutionCreation extends Component{

    constructor(props)
    {   super(props)
        this.state={
            InstitutionName:'',
            Description:'',
            InstCategory:0,
            securityTypeId:0,
            SignupAttempted:false,
            WrongRegistrationMsg:'',
            ValidDatMessage:'',
            SecurityList:[],
            CategoryList:[]
        };
        this.UserToken=UserProfile.getName();
    }    validateAllUserInput()
    {
        var phonenoval = /^\d{10}$/;
        var ValidationMsgRetn='';
        var isValidationSucess=true;
        if(this.state.InstitutionName.length<=3)
        {
            ValidationMsgRetn='Invalid Name';
            isValidationSucess=false;
        }

        if(this.state.InstCategory===0)
        {
            ValidationMsgRetn='Invalid Category';
            isValidationSucess=false;
        }

        if(this.state.securityTypeId===0)
        {
            ValidationMsgRetn='Invalid Security Choosn';
            isValidationSucess=false;
        }
      
      
        
        this.setState({
            WrongRegistrationMsg:ValidationMsgRetn,SignupAttempted:true
        });
       
             
        return isValidationSucess;

    }

    SubmitHander=(event)=>{
 
        var ValidationStatus=this.validateAllUserInput();
        console.log(this.state.InstitutionName+this.state.Description +this.state.InstCategory+this.state.securityTypeId)
 

        if(ValidationStatus==true)
        {
         (async () => {
            const rawResponse = await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/InstitutionRegistration', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'bearer '+this.UserToken
                },
                body: JSON.stringify({ InstitutionName: this.state.InstitutionName, Description: this.state.Description ,InstCategory:parseInt(this.state.InstCategory),securityTypeId:parseInt(this.state.securityTypeId)})
            });
            const content = await rawResponse.json();
            if(content.data===true)
            { 
                window.location.href="/dash-board"
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



    InstitutionNameChange=(event)=>{

        this.setState({
            InstitutionName: event.target.value
        });
       
    }

    DescriptionChange=(event)=>{

        this.setState({
            Description: event.target.value
        });
       
    }
    InstCategoryChange=(event)=>{

        this.setState({
            InstCategory: event.target.value
        });
       
    }

    securityTypeIdChange=(event)=>{

        this.setState(
            {
                securityTypeId:event.target.value   
            }
        );
    }


    componentDidMount(){
          
 this.setComponendDropdownStateCategory();
 this.setComponendDropdownStateSecurity();

    }

    async setComponendDropdownStateCategory(){

        const rawResponse= await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/FetchInstitutionCategory/',{
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'bearer '+this.UserToken
        }
        }
    );
    const content = await rawResponse.json();
   
    if(content.isSuccess==true)
    {
        
    this.setState({
        CategoryList:content.data
    });}

    }

    async setComponendDropdownStateSecurity(){

        const rawResponse= await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/FetchPublicInstitutionSecurityType/',{
            method:"GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'bearer '+this.UserToken
            }
            }
        );
    
        const content = await rawResponse.json();
        if(content.isSuccess==true)
{
    
        this.setState({
            SecurityList:content.data
        });}
        
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

<div  className="card">
<div className="card-header">
    <span className="text-warning"> Add your Institution </span>
    
  </div>
    <div className="card-body"> 
    {!this.UserToken? 'You are Not Logged in ': 
    <form>
    <div className="col-sm-12" style={divStyleint}> 
            <label className="text-dark font-weight-bold"> Name </label>
                <input type="text" value={this.state.InstitutionName} className="form-control" placeholder="Name of your Institution" style={tbStyle}  maxLength="50" onChange={this.InstitutionNameChange.bind(this)}/> 
            </div >

            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold">Description </label>
            <textarea type="text" value={this.state.Description} className="form-control" placeholder="Description ? what you do? where are you located? ( max 300 charachters) " style={tbStyle}  maxLength="300" onChange={this.DescriptionChange.bind(this)}>
                </textarea>
            </div>

            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold">Category</label>
        
            <select  value={this.state.InstCategory} className="form-control"   onChange={this.InstCategoryChange.bind(this)}>
             <option key="0" value="0">- Select -</option>
            { this.state.CategoryList.map(singleVal =>
             <option key={singleVal.instCatId} value={singleVal.instCatId}>
               
               {singleVal.institutionCategoryName}
            
              </option>
            
          )}


</select>
           
           
            </div>
            <div className="col-sm-12"  style={divStyleint}>
            <label className="text-dark  font-weight-bold"> Security Option </label>
        
            <select  value={this.state.securityTypeId} className="form-control"   onChange={this.securityTypeIdChange.bind(this)}>
             <option key="0" value="0">- Select -</option>
            { this.state.SecurityList.map(singleVal =>
             <option key={singleVal.securityTypeId} value={singleVal.securityTypeId}>
               
               {singleVal.securityDescription}
            
              </option>
            
          )}


</select>
       
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

            <input type="submit" value="Save" className="btn btn-primary float-right btn-roundEdge" onClick={this.SubmitHander.bind(this)} />
           }   


 
          
           </div>
            

    </form>}

     </div>
  </div>


</div>

</div>

 
        );

    }



 }

 export default InstitutionCreation;