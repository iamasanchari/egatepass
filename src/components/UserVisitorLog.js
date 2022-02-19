import React, { Component } from 'react';
import { render } from 'react-dom';
import UserProfile from './UserProfile';
export class UserVisitorLog extends Component {
    constructor(props) {
        super(props);
        this.UserToken=UserProfile.getName();
        this.state={ApiInstListCreated:[],loading: true};
        
      }

      componentDidMount() {
        this.populateInstitutionDataFromAPI();
      }

render()
{    
    
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    :  UserVisitorLog.renderTDynamicTable(this.state.ApiInstListCreated);
     
    

return(
 <div className="row">
     <div className="col-sm-12">
  
{contents}
</div>

    </div>
);

}

async populateInstitutionDataFromAPI() {
    


  const rawResponse = await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/FetchUserLog/', {
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
    
    
this.setState({ ApiInstListCreated: content.data,loading: false  });
}
};


static renderTDynamicTable(ApiInstListCreated)
{
    return(

       
        <div>
              {    
            ApiInstListCreated.length>0?
            
            <table class="table table-responsive">
            <tr>
    <th>Visited Location</th>
    <th>Entry/ Exit</th>
    <th>Log Time</th>
  </tr>
{ApiInstListCreated.map(singleVal =>
    <tr  key={singleVal.logTime}>
               
               <td>{singleVal.institutionName}</td>     
               <td>{
             singleVal.entryOrExitFlagNarration=='Exit'? <span className="text-danger">{singleVal.entryOrExitFlagNarration}</span>
             :<span className="text-success">{singleVal.entryOrExitFlagNarration}</span>
             } </td>
             <td>{singleVal.logTime}</td>
            
              </tr>
            
          )}
</table>
 :
 <span> You Haven't Generated Any Pass yet !</span>}
 
        </div>
    );
    
}

}



export default UserVisitorLog;