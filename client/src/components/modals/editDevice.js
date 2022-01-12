import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {fetchBrands, fetchOneDevice, fetchTypes, updateDevice} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import noImage from "../../img/no-image.png";

const EditDevice = observer(({show, onHide, oneDeviceId}) => {
    const {device} = useContext(Context)
    const [editedDevice, setEditedDevice] = useState({info: []})
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [changeFile, setChangeFile] = useState(false)

    const imageOfDevice = (file === undefined) ? noImage : process.env.REACT_APP_API_URL + file

    useEffect(() => {
        fetchOneDevice(oneDeviceId).then(data => {
            setEditedDevice(data)
            setPrice(data.price)
            setName(data.name)
            setFile(data.img)
        })
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
        setChangeFile(true)
    }
    const sendUpdatedDevice = () => {
        const formData = new FormData()
        formData.append('id', editedDevice.id)
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('brandId', device.selectedBrand.id || editedDevice.brandId)
        formData.append('typeId', device.selectedType.id || editedDevice.typeId)
        try {
            updateDevice(formData).then(data => {
                onHide()
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])


    let typeBeforeEditing
    let brandBeforeEditing
    device.types.map(type => {
            if (type.id === editedDevice.typeId) {
                return typeBeforeEditing = type.name
            }
        }
    )
    device.brands.map(brand => {
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
                    {!changeFile ? <Image height={100} src={imageOfDevice}/> :
                        'Просмотр изображений будет возможен после сохранения изменений'}

                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={sendUpdatedDevice}>Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    )
        ;
});

export default EditDevice;