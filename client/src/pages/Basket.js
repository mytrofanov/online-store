import React, {useContext, useEffect, useState} from 'react';
import {Button, ListGroup, Modal} from "react-bootstrap";
import {Context} from "../index";
import {clearBasket, delOneFromBasket, delSingleFromBasket, getBasket} from "../http/basketAPI";
import {fetchOneDevice} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";


const Basket = observer(({onHide, show}) => {
    const {basket} = useContext(Context)
    const [priceList, setPriceList] = useState([])
    const [totalSum, setTotalSum] = useState(0)
    const [basketInfo, setBasketInfo] = useState([])

    let basketId = basket.basketId

    const pay = () => {
        basket.setBasketVisible(false)
    }

    const delAllFromBasket = () => {
        try {
            clearBasket({basketId}).then(data => {
                    // console.log(data)
                    basket.setBasketEmpty(true)
                }
            )
        } catch (e) {
            console.log(e)
        }

    }
    const delOneFromBasket = (deviceId) => {
        const formData = new FormData()
        formData.append('deviceId', deviceId)
        formData.append('basketId', basketId)
        try {
            delOneFromBasket(formData)
        } catch (e) {
            console.log(e)
        }
    }
    const delSingleFromBasket = (deviceId) => {
        let single = 0
        basketInfo.forEach(i => {
                if (i.deviceId === deviceId) {
                    return single = i.id
                }
            }
        )
        try {
            if (single !== 0) {
                delSingleFromBasket(single)
            }
        } catch (e) {
            console.log(e)
        }
    }

    function makePriceList(array) {
        let b = []
        let c = array
        let idSet = new Set()
        let sum = 0
        c.forEach(i => {
            if (!idSet.has(i.id)) {
                b.push(i)
            }
            if (idSet.has(i.id)) {
                b.forEach(j => {
                    if (j.id === i.id) {
                        j.quality += 1
                    }
                })
            }
            idSet.add(i.id)
        })
        b.forEach(q => {
            q.summ = q.quality * q.price
        })

        b.forEach(item =>
            sum += item.summ
        )
        setTotalSum(sum)
        setPriceList(b)
    }

    useEffect(() => {
        if (basketId && basket.basketVisible) {
            let tempArray = []
            getBasket(basketId).then(data => {
                setBasketInfo(data)
                data.map(async (i) => {
                    await fetchOneDevice(i.deviceId).then(devices => {
                            devices !== undefined && tempArray.push(devices)
                        }
                    ).then(data =>
                        tempArray.forEach(i => i.quality = 1)
                    ).then(data =>
                        makePriceList(tempArray)
                    )
                })
            })
        }
    }, [basket.basketVisible, basket.basketEmpty])

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
                {basket.basketEmpty === true ? <div>Корзина пуста</div> : <ListGroup>
                    {priceList.map((device, index) =>
                        <div key={device.id + device.name} style={{display: 'flex', flexdirection: 'raw'}}>
                            <ListGroup.Item
                                key={device.id}
                                variant={index % 2 === 0 ? 'success' : 'light'}>

                                Название: {device.name}
                                Цена: {device.price}
                                Количество: {device.quality}
                                Сумма: {device.summ}
                            </ListGroup.Item>
                            <Button variant="outline-danger" onClick={() => {

                            }}>Удалить из корзины</Button>
                        </div>
                    )}
                    <ListGroup.Item variant="info">Итого: {totalSum}</ListGroup.Item>
                </ListGroup>
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={() => {
                    delAllFromBasket()
                }}>Очистить корзину</Button>
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
});

export default Basket;