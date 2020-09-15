import React from 'react';
import {Link} from 'react-router-dom';
import {Container, NavUL,NavItem} from './styledComponents';
import LogoutButton from './logoutButton';
const Navbar = ()=>{
    return(
        <Container>
            <nav>
                <NavUL>
                    <NavItem>
                    <Link to='/' style={{textDecoration:'none'}}><span>Home</span></Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/users' style={{textDecoration:'none'}}><span>My Page</span></Link>
                    </NavItem>
                    <NavItem>
    {localStorage.user_id? <LogoutButton />:<Link to='/login' style={{textDecoration:'none'}}><span>Login</span></Link>}                
                    </NavItem>
                </NavUL>     
            </nav> 
        </Container>
    )
}

export default Navbar;

