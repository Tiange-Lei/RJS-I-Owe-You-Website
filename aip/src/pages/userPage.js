import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewFavourForm from '../components/newFavourForm';
import NewAwardForm from '../components/newAward';
import Mylist from '../components/myfavourlist';
import Sidebar from '../components/sidebar';
const UserPage = ()=>(
    <div>
        <Sidebar />
        <NewFavourForm />
        <Mylist />
    </div>

)
export default UserPage;