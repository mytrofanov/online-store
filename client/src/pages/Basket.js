import React, {useContext, useEffect, useState} from 'react';
import {Button, ListGroup, Modal} from "react-bootstrap";
import {Context} from "../index";
import {getBasket} from "../http/basketAPI";
import {fetchOneDevice} from "../http/deviceAPI";


const Basket = ({onHide, show}) => {
    const {basket} = useContext(Context)
    const [priceList, setPriceList] = useState([])
    let totalSum = 0
    const pay = () => {
        basket.setBasketVisible(false)
    }
    let basketId = basket.basketId
    function makePriceList(array) {
        let b = []
        let c = array
        let idSet = new Set()

        c.forEach(i=>{
            if(!idSet.has(i.id)){
                b.push(i)
            }
            if(idSet.has(i.id)){
                b.forEach(j=>{
                    if(j.id === i.id) {j.quality +=1}
                })
            }
            idSet.add(i.id)
        })
        b.forEach(q=>{
            q.summ = q.quality * q.price
        })
        setPriceList(b)
    }

    useEffect(() => {
        if (basketId && basket.basketVisible) {
            console.log('basketId:' + basketId)
            let tempArray = []
            getBasket(basketId).then(data => {
                data.map(async (i) => {
                    await fetchOneDevice(i.deviceId).then(devices => {
                            devices !==undefined && tempArray.push(devices)
                        }
                    ).then(data=>
                        tempArray.forEach(i => i.quality = 1)
                    ).then(data=>
                        makePriceList(tempArray)
                    )
                })
            })
        }
    }, [basket.basketVisible])

    function totalSumToPay() {
        let sum
        priceList.forEach(item=>
            sum += item.summ
        )
        totalSum = sum
    }
    totalSumToPay()


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
                <ListGroup>
                    {priceList.map((device, index)=>
                        <ListGroup.Item
                            key={device.id}
                            variant={index % 2 === 0 ? 'success' : 'light'}>

                            Название: {device.name}
                            Цена: {device.price}
                            Количество: {device.quality}
                            Сумма: {device.summ}
                        </ListGroup.Item>

                    )}
                    <ListGroup.Item variant="info">Итого: {totalSum}</ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => {
                    basket.setAskForBasket(false)
                    onHide()
                }}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => {
                    pay()
                }}>Заказать</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Basket;