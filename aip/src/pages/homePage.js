import React from 'react';
import FavourList from '../components/favourList';
import LeaderBoard from '../components/leaderBoard';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents'
// ----------------------------------------------------------------------------------------------------------------------

const HomePage=(props)=>{
    return (
    <div>
        <RightSideBar>
            <LeaderBoard />
            <PartyBoard />
        </RightSideBar>
        <FavourList index={'home'}/>  
    </div>
    )
}

export default HomePage;