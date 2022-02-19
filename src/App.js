import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import {DashBoard} from './components/DashBoard';
import {UserVisitorLog} from './components/UserVisitorLog';
import {CamScan} from './components/CamScan';
import {Signup} from './components/Signup';
import {InstitutionCreation} from './components/InstitutionCreation';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={UserVisitorLog} />
        <Route path='/Login' component={Login} />
        <Route path='/Dash-Board' component={DashBoard} />
        <Route path='/CamScan' component={CamScan} />
        <Route path='/Signup' component={Signup} />
        <Route path='/InstitutionCreation' component={InstitutionCreation} />
        
  
      </Layout>
    );
  }
}
