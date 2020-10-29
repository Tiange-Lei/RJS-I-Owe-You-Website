import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewFavourForm from '../components/newFavourForm';
import NewAwardForm from '../components/newAward';
import Mylist from '../components/myfavourlist';
import Sidebar from '../components/sidebar';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents'
import LeaderBoard from '../components/leaderBoard';

const UserPage = () =>(
    <div>
        <RightSideBar>
            <LeaderBoard />
            <PartyBoard />
        </RightSideBar>
        <Sidebar />
        <NewFavourForm />
        <Mylist />
    </div>

)
export default UserPage;