import React from 'react';
import FavourList from '../components/favourList';
import LeaderBoard from '../components/leaderBoard';
const HomePage=()=>(
    <div>
        New favours:
        <FavourList />
        <LeaderBoard />
    </div>
)

export default HomePage;