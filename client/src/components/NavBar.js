import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";
import {observer} from "mobx-react-lite";


const NavBar = observer(({openBasket}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        user.setTriedToLogin(false)
    }


    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <NavLink style={{color: "white", textDecoration: "none"}} to={SHOP_ROUTE}> Nice Device </NavLink>
                <Nav className="ml-auto" style={{color: "white"}}>
                    {user.isAdmin &&
                        <>
                            <Button variant="secondary"
                                    className="me-lg-2"
                                    onClick={() => {
                                        navigate(ADMIN_ROUTE)
                                    }}
                            >Админ панель</Button>
                            <Button variant="secondary" className="me-lg-2"
                                    onClick={() =>  navigate(LOGIN_ROUTE)
                                    }>Авторизация</Button>
                        </>


                    }
                    {user.isAuth &&
                        <Button  variant="secondary" className="me-lg-2" onClick={() => logOut()
                        }>Выйти</Button>
                    }
                    {!user.isAuth &&
                        <Button variant="secondary" className="me-lg-2"
                                onClick={() => navigate(LOGIN_ROUTE)
                                }>Авторизация</Button>
                    }
                    <div>
                        <Button variant="secondary" className="me-lg-2"
                                onClick={() =>openBasket()
                                }>🛒</Button>
                    </div>


                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;