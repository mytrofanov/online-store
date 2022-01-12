import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {fetchOneDevice, updateInfo} from "../../http/deviceAPI";
import InfoForm from "../InfoForm";

const EditDeviceInfo = ({show, onHide, oneDeviceId}) => {

    const [info, setInfo] = useState([])

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
            setInfo(data.info)
        })
    }, [])



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
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
        ;
};

export default EditDeviceInfo;