import React from 'react';
import NewFavourForm from '../components/newFavourForm';
import FavourList from '../components/favourList';
import Sidebar from '../components/sidebar';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents'
import LeaderBoard from '../components/leaderBoard';
// ----------------------------------------------------------------------------------------------------------------------

const UserPage = ()=>(
    <div>
        <RightSideBar>
            <LeaderBoard />
            <PartyBoard />
        </RightSideBar>
        <Sidebar />
        <NewFavourForm />
        <FavourList index={'mypage'} size={50}/>
    </div>

)
export default UserPage;