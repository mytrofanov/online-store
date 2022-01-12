import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../index";


const Basket = ({onHide,show}) => {
    const{basket} = useContext(Context)
    const [value, setValue] = useState('')

    const pay = () => {

        basket.setBasketVisible(false)
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
                <Button variant="outline-success" onClick={() => {pay()}}>Заказать</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Basket;