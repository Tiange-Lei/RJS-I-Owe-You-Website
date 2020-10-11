import React from 'react';
import NewFavourForm from '../components/newFavourForm';
import NewAwardForm from '../components/newAward';
import Mylist from '../components/myfavourlist';

const UserPage = ()=>(
    <div>
        <NewFavourForm />
        <NewAwardForm />
        <Mylist />
    </div>
)
export default UserPage;