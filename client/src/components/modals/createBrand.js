import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";

const CreateBrand = ({show, onHide, setInfoToShow, setInfoVisible, setSmthChanged, brands}) => {
    const [value, setValue] = useState('')

    const addBrand = () => {
        if (brands.includes(value)) {
            setInfoToShow('Брэнд ' + value + ' уже существует!')
            setInfoVisible(true)
        }
        !brands.includes(value) &&
        createBrand({name: value}).then(data => {
                setValue('')
                setInfoToShow('Новый брэнд: ' + data.name + ' успешно создан!')
                setSmthChanged(smthChanged => !smthChanged)
            }
        )
        onHide()
        setInfoVisible(true)
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
                    Добавить новый Бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название бренда"}
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => addBrand()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;