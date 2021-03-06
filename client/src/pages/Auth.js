import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import InfoModal from "../components/modals/infoModal";
import {getBasketId} from "../http/basketAPI";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const {info} = useContext(Context)
    const {basket} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLoginPath = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER')

    const condition = () => {
        if (info.infoAuth.length > 1) {
            info.setInfoAuthVisible(true)
        }
        if (info.infoAuthVisible === false) {
            info.setInfoAuth('')
            history(SHOP_ROUTE)
        }
    }

    const click = async () => {
        try {
            let data;

            if (isLoginPath) {
                let basketId;
                await login(email, password)
                    .then(async data => {
                        let userId = data.id
                        basketId = await getBasketId(userId)
                        basketId.id !== undefined && basket.setBasketId(basketId.id)
                        if (data.role === "ADMIN") {
                            user.setIsAdmin(true)
                        }
                        if (data.id) {
                            user.setUserId(data.id)
                        }
                    }

                )



            } else {
                data = await registration(email, password, role)
                if (data.id !== undefined) {
                    user.setUserId(data.id)
                    info.setInfoAuth('?????????? ???????????????????????? ?? ??????????????: ' + data.email + ' ??????????????????????????????!')
                    condition()

                }
                if (data.id === undefined) {
                    info.setInfoAuth('??????-???? ?????????? ???? ?????? ...')
                    condition()
                }
            }
            user.setUser(user)
            user.setIsAuth(true)
            user.setTriedToLogin(true)
            if (isLoginPath) {
                history(SHOP_ROUTE)
            }
        } catch (e) {
            console.log(e)

        }
    }


    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLoginPath ? '??????????????????????' : '??????????????????????'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="?????????????? email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="?????????????? ????????????"
                        type="password"
                        value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    />
                    {!isLoginPath &&
                        <Form.Control
                            className="mt-3"
                            placeholder="???????? ????????"
                            type="text"
                            value={role} onChange={(e) => {
                            setRole(e.target.value)
                        }}
                        />
                    }



                    <Row className="d-flex justify-content-between p-lg-3">
                        {isLoginPath ? <div>
                                ?????? ????????????????? <NavLink to={REGISTRATION_ROUTE}>??????????????????????????????!</NavLink>
                            </div>
                            : <div>
                                ???????? ??????????????? <NavLink to={LOGIN_ROUTE}>??????????????!</NavLink>
                            </div>

                        }
                        <Button className="mt-3" variant={"outline-success"}
                                onClick={click}
                        >{
                            isLoginPath ? '??????????' : '????????????????????????????????????'}</Button>
                    </Row>

                </Form>
            </Card>
            <InfoModal show={info.infoAuthVisible}
                       infoMessage={info.infoAuth}
                       onHide={() => {
                           info.setInfoAuthVisible(false)
                           history(SHOP_ROUTE)
                       }}/> {/*shows the result of any action*/}
        </Container>
    );
});

export default Auth;