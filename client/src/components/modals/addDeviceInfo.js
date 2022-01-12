import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const AddDeviceInfo = ({show, onHide, oneDeviceId}) => {
    let [newInfo, setNewInfo] = useState([])

    const addInfo = () => {
        setNewInfo([...newInfo, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setNewInfo(newInfo.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setNewInfo(newInfo.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    const sendNewInfo = (array, deviceId) => {
        array.length < 1 && console.log('данные для отправки отсутствуют')
        !deviceId && console.log('Нет deviceId')
        if (array.length > 0) {
            const formData = new FormData()
            formData.append('info', JSON.stringify(array))
            formData.append('deviceId', deviceId)
            try {
                createInfo(formData).then(data => {
                    onHide()
                    console.log('ответ сервера:')
                    console.log(data)
                })
            } catch (e) {
                console.log(e)
            }
        }
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"

            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новую характеристику
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >Добавить новое свойство</Button>
                    {newInfo.map((i) =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => {
                                        changeInfo('title', e.target.value, i.number)
                                    }}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => {
                                        changeInfo('description', e.target.value, i.number)
                                    }}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button variant={"outline-danger"}
                                        onClick={() => {
                                            removeInfo(i.number)
                                        }}
                                >
                                    Удалить свойство
                                </Button>
                            </Col>
                        </Row>
                    )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={()=>{
                    sendNewInfo(newInfo,oneDeviceId)
                }}>Добавить</Button>

            </Modal.Footer>
        </Modal>
    );
}


export default AddDeviceInfo;