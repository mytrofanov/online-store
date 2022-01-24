import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import noImage from '../img/no-image.png'
import {useNavigate, useParams} from "react-router";
import {deleteDevice, fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import {SHOP_ROUTE} from "../utils/consts";
import EditDevice from "../components/modals/editDevice";
import EditDeviceInfo from "../components/modals/editDeviceInfo";
import AddDeviceInfo from "../components/modals/addDeviceInfo";
import {observer} from "mobx-react-lite";
import {putInBasket} from "../http/basketAPI";
import s from './style/DevicePage.module.css'
import InfoModal from "../components/modals/infoModal";

const DevicePage = observer(() => {
            const [oneDevice, setOneDevices] = useState({info: []})
            const [editVisible, setEditVisible] = useState(false)
            const [editInfoVisible, setEditInfoVisible] = useState(false)
            const [infoAddVisible, setInfoAddVisible] = useState(false)
            const {basket} = useContext(Context)
            const {id} = useParams()
            const {user} = useContext(Context)
            const {info} = useContext(Context)
            const navigate = useNavigate();

            let deviceId = Number(id)

            useEffect(() => {
                fetchOneDevice(id).then(data => setOneDevices(data))
            }, [editVisible, editInfoVisible, infoAddVisible, id])

            const delDevice = (oneDeviceId) => {
                deleteDevice({id: oneDeviceId}).then(data => {
                        info.setInfoShop(data.message)
                        info.setInfoShopVisible(true)
                    }
                )
                navigate(SHOP_ROUTE)
            }
            const putDeviceInBasket = (deviceId, basketId) => {
                const formData = new FormData()
                formData.append('deviceId', deviceId)
                formData.append('basketId', basketId)

                putInBasket(formData).then(data => {
                    basket.setBasketVisible(true)
                    basket.setAskForBasket(true)
                    basket.setBasketEmpty(false)
                })
            }
            const imageOfDevice = (oneDevice.img === undefined) ?
                noImage : process.env.REACT_APP_API_URL + '/' +  oneDevice.img


            return (
                <Container className="mt-3">
                    <Row>
                        <Col md={4}>
                            <Image className={s.image} src={imageOfDevice}/>
                        </Col>
                        <Col md={4}>
                            <Row className="d-flex flex-column align-items-center">
                                <h2>
                                    {oneDevice.name}
                                </h2>
                                <div className={s.rating}>
                                    {oneDevice.rating}
                                </div>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Card
                                className="d-flex flex-column align-items-center justify-content-around">
                                <div className={s.addToBasketCard}>
                                    <h3 className={s.price}>{oneDevice.price} грн.</h3>
                                    <Button variant={"outline-dark"}
                                            onClick={() => {
                                                if (basket.basketId) {
                                                    putDeviceInBasket(deviceId, basket.basketId)
                                                }
                                                !basket.basketId &&  info.setInfoShopVisible(true)
                                                info.setInfoShop('Пользователь не авторизован')
                                            }}
                                    >Добавить в корзину</Button>

                                </div>

                                {user.isAdmin && <div className={s.adminMenu}>
                                    <h5>Меню Администратора:</h5>

                                    <Button variant={"outline-danger"} size="sm"
                                            className={'mt-2'}
                                            onClick={() => {
                                                delDevice(id)
                                            }}
                                    >Удалить товар</Button>
                                    <Button variant={"outline-success"} size="sm"
                                            className={'mt-2'}
                                            onClick={() => {
                                                setEditVisible(true)
                                            }}
                                    >Редактировать параметры товара</Button>

                                    <Button variant={"outline-danger"} size="sm"
                                            className={'mt-2'}
                                            onClick={() => {
                                                setEditInfoVisible(true)
                                            }}
                                    >Изменить характеристики товара</Button>

                                    <Button variant={"outline-success"} size="sm"
                                            className={'mt-2'}
                                            onClick={() => {
                                                setInfoAddVisible(true)
                                            }}
                                    >Добавить характеристики товара</Button>
                                </div>
                                }
                            </Card>
                        </Col>
                    </Row>
                    <Row className="d-flex flex-column m-3">
                        <h2>Характеристики</h2>
                        {oneDevice.info.map((info, index) =>
                            <Row key={info.id} style={
                                {background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                                {info.title} : {info.description}
                            </Row>
                        )}
                    </Row>

                    <EditDevice show={editVisible}
                                oneDeviceId={id}
                                onHide={() => {
                                    setEditVisible(false)
                                }}/>

                    <EditDeviceInfo show={editInfoVisible}
                                    oneDeviceId={id}
                                    onHide={() => {
                                        setEditInfoVisible(false)
                                    }}/>
                    <AddDeviceInfo show={infoAddVisible}
                                   oneDeviceId={id}
                                   onHide={() => {
                                       setInfoAddVisible(false)
                                   }}/>
                    <InfoModal show={info.infoShopVisible}
                               infoMessage={info.infoShop}
                               onHide={() => {
                                   info.setInfoShopVisible(false)
                                   info.setInfoShop('')
                               }}/> {/*shows the result of any action*/}

                </Container>
            );

        }
    )
;

export default DevicePage;