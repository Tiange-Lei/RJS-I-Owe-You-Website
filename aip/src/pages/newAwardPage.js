import React from 'react';
import NewAwardForm from '../components/newAward';
import Sidebar from '../components/sidebar';
import AwardRelationList from '../components/awardRelationList';
const NewAwardPage =()=>(
    <div>
        <Sidebar />
        <NewAwardForm />
        <AwardRelationList />
    </div>
)

export default NewAwardPage;