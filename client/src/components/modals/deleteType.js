import React, {useContext, useState} from 'react';
import {Button, ListGroup, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteType = observer(({show, onHide}) => {
    const {device} = useContext(Context)



    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"

            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {device.types.map(type =>
                        <ListGroup.Item key={type.id}
                                        style={{cursor: 'pointer'}}
                                        active={type.id === device.selectedType.id}
                                        onClick={() => {
                                            device.setSelectedType(type)
                                        }}
                        >
                            {type.name}
                        </ListGroup.Item>
                    )
                    }

                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={onHide}>Удалить</Button>

            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;