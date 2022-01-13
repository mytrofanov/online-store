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
    let basketId = basket.basketId

    useEffect(()=>{
            if(basketId && basket.askForBasket) {
            console.log('basketId:' + basketId)
            getBasket({basketId}).then(data=>{
                console.log(data)
                // basket.setBasketDevices(data)
            })
        }

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