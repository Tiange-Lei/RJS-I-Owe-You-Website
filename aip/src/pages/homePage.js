import React, {useState} from 'react';
import FavourList from '../components/favourList';
import LeaderBoard from '../components/leaderBoard';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents';
import {Pagination} from 'antd';
// ----------------------------------------------------------------------------------------------------------------------

const HomePage=(props)=>{

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const { favours } = props;
    const { data } = favours || {};
    const { __Condition__, } = data[0] || {};
    const { total = 1 } = __Condition__ || {};
    const publisher = localStorage.username;
    console.log('total:', total);
    console.log('publisher',publisher)
    
    return (
    <div>
        <RightSideBar>
            <LeaderBoard />
            <PartyBoard />
        </RightSideBar>
        <FavourList page={page} size={size} options={{ publisher }}/>
            <div style={{ display: 'flex', margin: '20px' }}>
                <div style={{ flex: 1 }}></div>
                <div>
                    <Pagination pageSizeOptions={[5, 10, 15, 20, 30, 50]} pageSize = {size} defaultCurrent={1} total={total} onChange={(num, b) => {
                        setPage(num);
                    }} onShowSizeChange={(index, pageSize) => {
                        setSize(pageSize)
                    }} />
                </div>
                <div style={{ flex: 1 }}></div>
            </div>           
        <FavourList index={'home'}/>  

    </div>
    )
}

export default HomePage;