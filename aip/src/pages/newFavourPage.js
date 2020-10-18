import React from 'react';
import NewFavourForm from '../components/newFavourForm';
import Sidebar from '../components/sidebar';
import Mylist from '../components/myfavourlist';

const NewFavourPage =()=>(
    <div>
        <Sidebar />
        <NewFavourForm />
        <Mylist />
    </div>

)
export default NewFavourPage;