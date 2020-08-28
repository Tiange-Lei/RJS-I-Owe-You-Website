import React from 'react';
import {Link} from 'react-router-dom';
import {Container, NavUL,NavItem} from './styledComponents';


const Navbar = ()=>{
    return(
        <Container>
            <nav>
                <NavUL>
                    <NavItem>
                    <Link to='/favours' style={{textDecoration:'none'}}><span>Home</span></Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/users' style={{textDecoration:'none'}}><span>My Page</span></Link>
                    </NavItem>
                </NavUL>
            </nav>
        </Container>
    )
}

export default Navbar;
