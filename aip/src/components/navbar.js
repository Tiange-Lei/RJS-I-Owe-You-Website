import React from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from './logoutButton';
import SearchFavour from './searchFavour';
import {Container, 
    NavUL,
    NavItem,
    BarTitle,
    LOGOContainer,
    LOGO_I,
    LOGO_O,
    LOGO_U,
    Greeting,
} from './styledComponents';
// ----------------------------------------------------------------------------------------------------------------------

const Navbar = ()=>{
    return(
        <Container>
            <nav>
                <NavUL>
                    <LOGOContainer>
                        <LOGO_I>I</LOGO_I>
                        <LOGO_O>O</LOGO_O>
                        <LOGO_U>U</LOGO_U>
                    </LOGOContainer>
                    <Greeting>
                        {localStorage.username?<div>Hi,{localStorage.username}</div>:null}
                    </Greeting>
                    <NavItem>
                        <Link to='/' style={{textDecoration:'none'}}><BarTitle>Home</BarTitle></Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/users' style={{textDecoration:'none'}}><BarTitle>My Page</BarTitle></Link>
                    </NavItem>
                    <NavItem>
                        {localStorage.user_id? <LogoutButton />:<Link to='/login' style={{textDecoration:'none'}}><BarTitle>Login</BarTitle></Link>}                
                    </NavItem>
                    <SearchFavour />   
                </NavUL>  
            </nav> 
        </Container>
    )
}

export default Navbar;

