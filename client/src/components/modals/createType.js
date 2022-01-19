import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/deviceAPI";

const CreateType = ({show, onHide, setInfoToShow, setInfoVisible, setSmthChanged, types}) => {
    const [value, setValue] = useState('')


    const addType = () => {
        if (types.includes(value)) {
            setInfoToShow('Тип ' + value + ' уже существует!')
            setInfoVisible(true)
        }
        if (!types.includes(value)) {
            createType({name: value}).then(data => {
                    setValue('')
                    setInfoToShow('Новый тип ' + data.name + ' успешно создан!')
                    setSmthChanged(smthChanged => !smthChanged)
                }
            )
            onHide()
            setInfoVisible(true)
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
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название типа"}
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => addType()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;