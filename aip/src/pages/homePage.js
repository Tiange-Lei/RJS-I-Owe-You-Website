import React from 'react';
import FavourList from '../components/favourList';
// import { Pagination } from 'antd';

const HomePage=()=>(
    <div>
        New favours:
        <FavourList />
        {/* <Pagination defaultCurrent={1} total={50}/> */}
    </div>
)

export default HomePage;