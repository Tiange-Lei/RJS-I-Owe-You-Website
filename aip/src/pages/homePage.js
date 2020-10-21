import React, {useState} from 'react';
import FavourList from '../components/favourList';
import LeaderBoard from '../components/leaderBoard';
import PartyBoard from '../components/partyBoard';
import {RightSideBar} from '../components/styledComponents'

import { connect } from 'react-redux';
import { Pagination } from 'antd';


const HomePage=(props)=>{
    const [page, setPage] = useState(1);
    const { favours } = props;
    const { data } = favours || {};
    const { __Condition__, } = data[0] || {}
    const { total = 1 } = __Condition__ || {};
    console.log('total:', total);

    return (
    <div>
        <RightSideBar>
            <LeaderBoard />
            <PartyBoard />
        </RightSideBar>
        <FavourList page={page} size={10} />
            <div style={{ display: 'flex', margin: '20px' }}>
                <div style={{ flex: 1 }}></div>
                <div>
                    <Pagination defaultCurrent={1} total={total} onChange={(num, b) => {
                        setPage(num);
                    }} />
                </div>
                <div style={{ flex: 1 }}></div>
            </div>           
    </div>
    )
}

const mapStateToProps = state => ({ favours: state.favours, });
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);