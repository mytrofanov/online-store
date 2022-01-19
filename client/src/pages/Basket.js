import React, {useContext, useEffect, useState} from 'react';
import {Button, ListGroup, Modal} from "react-bootstrap";
import {Context} from "../index";
import {clearBasket, delOneFromBasket, delSingleFromBasket, getBasket, putInBasket} from "../http/basketAPI";
import {fetchOneDevice} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";
import s from './style/Basket.module.css'

const Basket = observer(({onHide, show}) => {
            const {basket} = useContext(Context)
            const [priceList, setPriceList] = useState([])
            const [totalSum, setTotalSum] = useState(0)
            const [basketInfo, setBasketInfo] = useState([])
            const [basketChange, setBasketChange] = useState(false)

            let basketId = basket.basketId

            const pay = () => {
                basket.setBasketVisible(false)
            }
            const plus = (deviceId) => {
                const formData = new FormData()
                formData.append('deviceId', deviceId)
                formData.append('basketId', basketId)
                putInBasket(formData).then(data => {
                        // console.log(data)
                        setBasketChange(basketChange => !basketChange)
                    }
                )
            }
            const delAllFromBasket = () => {
                clearBasket({basketId}).then(data => {
                        // console.log(data)
                        basket.setBasketEmpty(true)
                    }
                )
            }
            const deleteDeviceFromBasket = (deviceId) => {
                const formData = new FormData()
                formData.append('deviceId', deviceId)
                formData.append('basketId', basketId)
                delOneFromBasket(formData).then(data => {
                    setBasketChange(basketChange => !basketChange)
                })

            }
            const minus = (deviceId) => {
                for (let i = 0; i < basketInfo.length; i++) {
                    if (basketInfo[i].deviceId === deviceId) {
                        return delSingleFromBasket({id: basketInfo[i].id}).then(data =>
                            setBasketChange(basketChange => !basketChange)
                        )
                    }
                }

            }

//function that makes new array of devices from received data, counts quality of each device and sum:
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
                        if (data.length === 0) {
                            basket.setBasketEmpty(true)
                        }
                        setBasketInfo(data)
                        data.map(async (i) => {
                            await fetchOneDevice(i.deviceId).then(devices => {
                                    devices !== undefined && tempArray.push(devices)
                                }
                            ).then(data =>
                                tempArray.forEach(i => i.quality = 1)
                            ).then(data => {
                                    makePriceList(tempArray)
                                    tempArray.length > 0 && basket.setBasketEmpty(false)

                                }
                            )
                        })
                    })
                }
            }, [basket.basketVisible, basketChange, basket.askForBasket])


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
                                    <ListGroup.Item key={device.id+Number(Math.random()*10)} className={'d-flex align-content-md-between'}
                                                    variant={index % 2 === 0 ? 'success' : 'light'}>

                                        <b className={s.deviceName}>{device.name} </b>

                                        <input type="text" className={s.price}
                                               key={device.id + device.price+Number(Math.random()*10)}
                                               defaultValue={device.price}/>
                                        <Button variant="outline-danger" size={"sm"} onClick={() => {
                                            minus(device.id)
                                        }}>−</Button>
                                        <input type="text" className={s.quality}
                                               key={device.id + device.quality+Number(Math.random()*10)}
                                               defaultValue={device.quality}/>
                                        <Button variant="outline-danger" size={"sm"} onClick={() => {
                                            plus(device.id)
                                        }}>+</Button>
                                        <input type="text" className={s.summ}
                                               key={device.id + device.summ+Number(Math.random()*10)}
                                               defaultValue={device.summ}/>

                                        {/*<Button variant="outline-danger"  size={"sm"}   onClick={() => {*/}
                                        {/*    deleteDeviceFromBasket(device.id)*/}
                                        {/*}}>Удалить из корзины</Button>*/}

                                    </ListGroup.Item>

                            )}
                            <ListGroup.Item variant="info"> <b className={s.totalSum}>Итого: {totalSum}</b></ListGroup.Item>
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
        }
    )
;

export default Basket;