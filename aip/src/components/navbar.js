import React from 'react';
import {Link} from 'react-router-dom';
import {Container, NavUL,NavItem,BarTitle,SearchFrame,SearchInput,SearchButton} from './styledComponents';
import {Layout, Menu, Breadcrumb} from 'antd';
import LogoutButton from './logoutButton';

const Navbar = ()=>{
    return(
        <Container>
            <div>
                <SearchFrame>
                <SearchInput type='text' placeholder='Search'/>
                <SearchButton type='submit' value='Search'/>
                </SearchFrame>
            </div>   
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

