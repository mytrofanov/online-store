import React from 'react';
import {Button, Modal} from "react-bootstrap";

const InfoModal = ({show, onHide, infoMessage}) => {


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"

            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Результат:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {infoMessage || 'No answer from server'}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InfoModal;