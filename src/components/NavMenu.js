import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import imgBrandLogo from '../imgIcons/egatePassLogo.png'
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    const divStyle = {maxHeight:"50px" };
    return (
      
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar-light bg-light" light>
          <Container>
            <NavbarBrand onClick={()=>{this.setState({collapsed:true})}} tag={Link} to="/"><b><img src={imgBrandLogo} style={divStyle}></img> E GATEPASS </b></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem className="text-center"> 
                  <NavLink tag={Link} className="text-dark" to="/login" onClick={()=>{this.setState({collapsed:true})}}>Login</NavLink>
                </NavItem>

                <NavItem className="text-center"> 
                  <NavLink tag={Link} className="text-dark" to="/Signup" onClick={()=>{this.setState({collapsed:true})}}>Signup</NavLink>
                </NavItem>
                <NavItem className="text-center"> 
                  <NavLink tag={Link} className="text-dark" to="/CamScan" onClick={()=>{this.setState({collapsed:true})}}>Scan QR</NavLink>
                </NavItem>
                <NavItem className="text-center"> 
                  <NavLink tag={Link} className="text-dark" to="/Dash-Board" onClick={()=>{this.setState({collapsed:true})}}>Dash Board</NavLink>
                </NavItem>

                
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
