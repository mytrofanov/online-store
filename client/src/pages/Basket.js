import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../index";
import {getBasket} from "../http/basketAPI";


const Basket = ({onHide,show}) => {
    const{basket} = useContext(Context)
    const{user} = useContext(Context)
    const pay = () => {

        basket.setBasketVisible(false)
    }

    useEffect(()=>{
            if(user.userId && basket.askForBasket) {
            console.log(user.userId)
            getBasket({basketId:user.userId}).then(data=>{
                console.log(data)
                basket.setBasketDevices(data)
            })
        } else console.log('пользователь не авторизован')

    },[])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"

            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Корзина
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Здесь будут товары
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={()=>{
                    basket.setAskForBasket(false)
                    onHide()
                }}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => {pay()}}>Заказать</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Basket;