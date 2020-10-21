import React from 'react';
import FavourList from '../components/favourList';
import LeaderBoard from '../components/leaderBoard';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents'
const HomePage=()=>(
    <div>
        <RightSideBar>
            <LeaderBoard />
            <PartyBoard />
        </RightSideBar>
        <FavourList />        
    </div>
)

export default HomePage;