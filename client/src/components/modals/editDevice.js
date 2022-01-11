import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {fetchBrands, fetchOneDevice, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import noImage from "../../img/no-image.png";

const EditDevice = observer(({show, onHide, oneDeviceId}) => {
    const {device} = useContext(Context)
    const [editedDevice, setEditedDevice] = useState({info: []})
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [changeFile, setChangeFile] = useState(false)
    const imageOfDevice = (file === undefined) ? noImage : process.env.REACT_APP_API_URL + file

    useEffect(() => {
        fetchOneDevice(oneDeviceId).then(data => {
            setEditedDevice(data)
            setPrice(data.price)
            setName(data.name)
            setFile(data.img)
            setInfo(data.info)
            console.log(data.info)
        })
    }, [])


    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        console.log('changeInfo:', 'key:',key, 'value:', value, 'number:',number)
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i))
    }
    const changeInfoTitle = (key, value, number) => {
        console.log('changeInfo:', 'key:',key, 'value:', value, 'number:',number)
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
        setChangeFile(true)
    }
    // const addDevice = () => {
    //     const formData = new FormData()
    //     formData.append('name', name)
    //     formData.append('price', `${price}`)
    //     formData.append('img', file)
    //     formData.append('brandId', device.selectedBrand.id)
    //     formData.append('typeId', device.selectedType.id)
    //     formData.append('info', JSON.stringify(info))
    //
    //     try {
    //         createDevice(formData).then(data => {
    //             onHide()
    //             if (data.id !== undefined) {
    //                 console.log('Изменения внесены')
    //             } else console.log('Нет ответа от сервера')
    //
    //         })
    //
    //     } catch (e) {
    //         console.log(e)
    //     }
    //
    //
    // }

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])


    let typeBeforeEditing
    let brandBeforeEditing
    device.types.map(type=> {
            if (type.id === editedDevice.typeId) {
                return typeBeforeEditing = type.name
            }
        }
    )
    device.brands.map(brand=> {
            if (brand.id === editedDevice.brandId) {
                return brandBeforeEditing = brand.name
            }
        }
    )

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать данные:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || typeBeforeEditing}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => {
                                    device.setSelectedType(type)
                                }} key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>{device.selectedBrand.name || brandBeforeEditing}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item onClick={() => {
                                    device.setSelectedBrand(brand)
                                }} key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Название</Form.Label>
                        <Col sm="10">
                    <Form.Control
                        className="mt-3"
                        placeholder={editedDevice.name}
                        value={name}
                        onChange={e =>
                            setName(e.target.value)
                        }
                    />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Цена</Form.Label>
                        <Col sm="10">
                    <Form.Control
                        className="mt-3"
                        placeholder={editedDevice.price}
                        value={price}
                        onChange={e =>
                            setPrice(Number(e.target.value))
                        }
                        type="number"
                    />
                        </Col>
                    </Form.Group>
                    <h6 className="mt-3">
                        Загрузите изображение устройства:
                    </h6>
                    {!changeFile ? <Image height={100}  src={imageOfDevice}/> :
                        'Просмотр изображений будет возможен после сохранения изменений'}

                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >Добавить новое свойство</Button>
                    {info.map((i) =>
                        <Row className="mt-3" key={ Date.now() + Math.random()}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => {
                                        changeInfoTitle('title', e.target.value, i.id)
                                    }}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => {
                                        changeInfo('description', e.target.value, i.id)
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
                <Button variant="outline-success" onClick={onHide}>Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    )
        ;
});

export default EditDevice;