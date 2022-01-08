import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
        user.setTriedToLogin(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <NavLink style={{color: "white", textDecoration: "none"}} to={SHOP_ROUTE}> Nice Device </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant="secondary"
                                className="me-lg-2"
                                onClick={() => {
                                    navigate(ADMIN_ROUTE)
                                }}
                        >Админ панель</Button>
                        <Button variant="secondary" onClick={() => logOut()
                        }>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant="secondary" onClick={() => navigate(LOGIN_ROUTE)
                        }>Авторизация</Button>

                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;