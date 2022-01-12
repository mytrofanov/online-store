import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from '../img/Five-pointed_star.svg'
import noImage from '../img/no-image.png'
import {useNavigate, useParams} from "react-router";
import {deleteDevice, fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import {SHOP_ROUTE} from "../utils/consts";
import EditDevice from "../components/modals/editDevice";
import EditDeviceInfo from "../components/modals/editDeviceInfo";

const DevicePage = () => {
    const [oneDevice, setOneDevices] = useState({info: []})
    const [editVisible, setEditVisible] = useState(false)
    const [editInfoVisible, setEditInfoVisible] = useState(false)
    const {id} = useParams()
    const {user} = useContext(Context)
    const {info} = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneDevice(id).then(data => setOneDevices(data))
    }, [editVisible,editInfoVisible])

     const delDevice = (oneDeviceId) => {
        deleteDevice({id: oneDeviceId}).then(data => {
                info.setInfoShop(data.message)
                info.setInfoShopVisible(true)
            }
        )
        navigate(SHOP_ROUTE)
    }


    const imageOfDevice = (oneDevice.img === undefined) ? noImage : process.env.REACT_APP_API_URL + oneDevice.img


    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={imageOfDevice}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>
                            {oneDevice.name}
                        </h2>
                        <div className="d-flex align-items-center justify-content-center"
                             style={{
                                 background: `url(${star}) no-repeat center center`,
                                 width: 150, height: 150, backgroundSize: 'cover',
                                 fontSize: 55
                             }}>
                            {oneDevice.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className="d-flex flex-column align-items-center justify-content-around"
                          style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
                        <h3>{oneDevice.price} грн.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                        {user.isAdmin && <div>
                            <Button variant={"outline-danger"}
                                    onClick={() => {
                                        delDevice(id)
                                    }}
                            >Удалить товар</Button>
                            <Button variant={"outline-success"}
                            onClick={()=>{setEditVisible(true)}}
                            >Редактировать параметры товара</Button>

                            <Button variant={"outline-success"}
                            onClick={()=>{setEditInfoVisible(true)}}
                            >Изменить характеристики товара</Button>
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


        </Container>
    );

};

export default DevicePage;