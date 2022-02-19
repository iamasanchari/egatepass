import React, { Component } from 'react';
import { render } from 'react-dom';
import UserProfile from './UserProfile';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserCreatedInstitution from './UserCreatedInstitution';
import UserVisitorLog from './UserVisitorLog'
 
export class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.UserToken=UserProfile.getName();
      }

render()
{  
 
    
return(
 <div>

   
 <div className="card">
 <div className="card-header">
    <span className="text-warning"> Your Institutions</span>
    <span className="float-right btn btn-secondary btn-sm">
    <NavLink tag={Link} className="text-light" to="/InstitutionCreation">Add New </NavLink>
    </span>
  </div>
    <div className="card-body">{!this.UserToken? 'You are Not Logged in ': <UserCreatedInstitution/>}</div>
  </div>
  <div className="card">
 <div className="card-header">
    <span className="text-warning"> Your Visit Log </span>
    
  </div>
    <div className="card-body">{!this.UserToken? 'You are Not Logged in ': <UserVisitorLog/>}</div>
  </div>

    </div>
);


}

}