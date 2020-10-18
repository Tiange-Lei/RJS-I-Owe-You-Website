import React from 'react';
import {Link} from 'react-router-dom';
import {SideBarContainer,SideUL,SideItem} from '../components/styledComponents'
const Sidebar = ()=>(
    <SideBarContainer>
        <SideUL>
            <SideItem>
                <Link to='/newFavour' style={{textDecoration:'none'}}>Request</Link>
            </SideItem>
            <SideItem>
                <Link to='/newAward' style={{textDecoration:'none'}}>Award</Link>
            </SideItem>
        </SideUL>
        
    </SideBarContainer>
)

export default Sidebar;