import React, { Component } from 'react';
import { render } from 'react-dom';
import UserProfile from './UserProfile';
import QrCodeGenerator from './QrCodeGenerator';
export class UserCreatedInstitution extends Component {
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
    :  UserCreatedInstitution.renderTDynamicTable(this.state.ApiInstListCreated);
     
    

return(
 <div className="row">
     <div className="col-sm-12">
  
{contents}
</div>

    </div>
);

}

async populateInstitutionDataFromAPI() {
    


  const rawResponse = await fetch(process.env.REACT_APP_EGATEPASS_APIRUI+'/api/InstitutionFetch', {
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
}


static renderTDynamicTable(ApiInstListCreated)
{
    return(

       
        <div>
{ApiInstListCreated.map(singleVal =>
    <div class="card" key={singleVal.instId}>
             <div class="card-body" >
                
             <h5 class="card-title">{singleVal.institutionName}</h5>
             <p class="card-subtitle mb-2 text-muted">#{singleVal.instId}</p>
             <QrCodeGenerator value={singleVal.encryptedInstitutionId+''} />
        
             <p class="card-text">{singleVal.description}</p>
             <a href="#" class="card-link">Visitors List</a>
            
           </div>
              
              </div>
            
          )}

        </div>
    );
    
}

}



export default UserCreatedInstitution;