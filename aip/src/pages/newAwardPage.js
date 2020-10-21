import React from 'react';
import NewAwardForm from '../components/newAward';
import Sidebar from '../components/sidebar';
import AwardRelationList from '../components/awardRelationList';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents'
import LeaderBoard from '../components/leaderBoard';
const NewAwardPage =()=>(
    <div>
        <RightSideBar>
            <LeaderBoard />
            <PartyBoard />
        </RightSideBar>
        <Sidebar />
        <NewAwardForm />
        <AwardRelationList />
    </div>
)

export default NewAwardPage;