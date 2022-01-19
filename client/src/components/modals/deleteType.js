import React, {useContext} from 'react';
import {Alert, Button, ListGroup, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {deleteType} from "../../http/deviceAPI";

const DeleteType = observer(({show, onHide, setInfoToShow,setInfoVisible, setSmthChanged}) => {
    const {device} = useContext(Context)


    const delType = (name) => {
        deleteType({name: name}).then(data =>
            setInfoToShow(data.message)
        )
        setSmthChanged(smthChanged => !smthChanged)
        onHide()
        setInfoVisible(true)
    }
   const name = device.selectedType.name


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
                    <Alert  variant="danger">
                        Внимание! При удалении типа все связанные с ним товары станут недоступны в режиме фильтр!
                        Каждому товару из удаленной категории нужно будет присвоить новый тип!
                    </Alert>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup >
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
                <Button variant="outline-success" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={()=>{delType(name)}}>Удалить</Button>

            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;