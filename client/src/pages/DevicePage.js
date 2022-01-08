import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import star from '../img/Five-pointed_star.svg'
import noImage from '../img/no-image.png'
import {useParams} from "react-router";
import {fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevices] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevices(data))
    }, [])

    const imageOfDevice = (device.img === undefined) ? noImage : process.env.REACT_APP_API_URL + device.img

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={imageOfDevice}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>
                            {device.name}
                        </h2>
                        <div className="d-flex align-items-center justify-content-center"
                             style={{
                                 background: `url(${star}) no-repeat center center`,
                                 width: 150, height: 150, backgroundSize: 'cover',
                                 fontSize: 55
                             }}>
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className="d-flex flex-column align-items-center justify-content-around"
                          style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
                        <h3>{device.price} грн.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики</h2>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={
                        {background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;