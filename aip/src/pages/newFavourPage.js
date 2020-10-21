import React from 'react';
import NewFavourForm from '../components/newFavourForm';
import Sidebar from '../components/sidebar';
import Mylist from '../components/myfavourlist';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents'
import LeaderBoard from '../components/leaderBoard';

const NewFavourPage =()=>(
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
export default NewFavourPage;