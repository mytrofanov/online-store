import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {fetchBrands, fetchOneDevice, fetchTypes, updateDevice, updateInfo} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import noImage from "../../img/no-image.png";
import InfoForm from "../InfoForm";

const EditDevice = observer(({show, onHide, oneDeviceId}) => {
    const {device} = useContext(Context)
    const [editedDevice, setEditedDevice] = useState({info: []})
    const [info, setInfo] = useState([])
    const [changeFile, setChangeFile] = useState(false)
    const onSubmit = data => {
        arrayCreator(data)
    }

    function arrayCreator(obj) {
        let array = []
        let counter = 0
        let id
        let title = ''

        for (let key in obj) {
            if (/^[\d:]*$/.test(key)) {
                id = Number(key)
                title = obj[key]
                array.push([{'id': id, 'title': title}])
                counter++
            }
        }
        for (let key in obj) {

            if (/d:/.test(key)) {
                let tempKey = Number(key.slice(2))
                for (let i = 0; i < array.length; i++) {
                    if (typeof (tempKey) === "number" && tempKey == array[i][0].id) {
                        array[i][0]['description'] = obj[key]
                    }
                }
            }
        }
        return  sendUpdatedInfo(array)
    }

    useEffect(() => {
        fetchOneDevice(oneDeviceId).then(data => {
            setEditedDevice(data)
            setInfo(data.info)

        })
    }, [])


    // const addInfo = () => {
    //     setInfo([...info, {title: '', description: '', number: Date.now()}])
    // }
    // const removeInfo = (number) => {
    //     setInfo(info.filter(i => i.number !== number))
    // }

    // const changeInfo = (key, value, id) => {
    //     console.log('changeInfo:', 'key:',key, 'value:', value, 'id:',id)
    //     setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    // }

    // const changeInfo = (key, value, id) => {
    //     console.log('changeInfo:', 'key:',key, 'value:', value, 'id:',id)
    //     setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    // }


    const sendUpdatedInfo = (array) => {
        array.length < 1 && console.log('данные для отправки отсутствуют')
        if (array.length > 0) {
            const formData = new FormData()
            formData.append('info', JSON.stringify(array))
            try {
                updateInfo(formData).then(data => {
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
                    Редактировать характеристики:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InfoForm info={info} setInfo={setInfo} onSubmit={onSubmit}/>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"outline-dark"}
                    onClick={() => {
                    }}
                >Добавить новое свойство</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
        ;
});

export default EditDevice;