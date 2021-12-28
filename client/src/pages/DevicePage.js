import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from '../img/Five-pointed_star.svg'

const DevicePage = () => {
    const device = {
        id: 1,
        name: 'Веб-камера A4Tech PK-930HA USB Black',
        rating: 5,
        price: 1200,
        img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
    }
    const description = [
        {id: 1, title: 'Разрешение видео', description: 'FullHD (1920x1080)'},
        {id: 2, title: 'Сенсор', description: 'CMOS'},
        {id: 3, title: 'Встроенный микрофон', description: 'С микрофоном'},
        {id: 4, title: 'Фокусировка', description: 'Автофокус'},
        {id: 5, title: 'Страна-производитель', description: 'Китай'},
    ]

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img}/>
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
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;