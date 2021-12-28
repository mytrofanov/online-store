import React from 'react';
import {Col, Container, Image} from "react-bootstrap";

const DevicePage = () => {
    const device =  {
            id: 1,
            name: 'Веб-камера A4Tech PK-930HA USB Black',
            rating: 5,
            img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
        }

    return (
        <Container className="mt-3">
            <Col md={4}>
                <Image width={300} height={300} src={device.img}/>
            </Col>
            <Col md={4}>

            </Col>
            <Col md={4}>

            </Col>
        </Container>
    );
};

export default DevicePage;