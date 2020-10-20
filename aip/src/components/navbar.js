import React from 'react';
import {Link} from 'react-router-dom';
import {Container, NavUL,NavItem,BarTitle} from './styledComponents';
import {Layout, Menu, Breadcrumb} from 'antd';
import LogoutButton from './logoutButton';

const Navbar = ()=>{
    return(
        <Container>
            <nav>
                <NavUL>
                    <NavItem>
                        <Link to='/' style={{textDecoration:'none'}}><BarTitle>Home</BarTitle></Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/users' style={{textDecoration:'none'}}><BarTitle>My Page</BarTitle></Link>
                    </NavItem>
                    <NavItem>
                        {localStorage.user_id? <LogoutButton />:<Link to='/login' style={{textDecoration:'none'}}><BarTitle>Login</BarTitle></Link>}                
                    </NavItem>
                </NavUL>     
            </nav> 
        </Container>
    )
}

export default Navbar;

