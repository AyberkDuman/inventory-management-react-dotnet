import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Inventory from './components/Inventory';
import Employee from './components/Employee';
import Error from './components/Error';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/Inventory' component={Inventory} />
    <Route path='/Employee' component={Employee} />
    <Route path='/Error' component={Error} />
  </Layout>
);
