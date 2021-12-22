import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {SHOP_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer( () => {
    const {user} = useContext(Context)

    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <NavLink style={{color: "white", textDecoration: "none"}} to={SHOP_ROUTE}> Nice Device </NavLink>
                {user._isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant="secondary"  className="me-lg-2">Админ панель</Button>
                        <Button variant="secondary" onClick={()=>{user.setIsAuth(false)}}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                    <Button variant="secondary" onClick={()=>{user.setIsAuth(true)}}>Авторизация</Button>

                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;