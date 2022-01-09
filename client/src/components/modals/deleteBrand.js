import React, {useContext} from 'react';
import {Button, Card,  Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {deleteBrand} from "../../http/deviceAPI";

const DeleteBrand = observer(({show, onHide, setInfoToShow,setInfoVisible}) => {

    const {device} = useContext(Context)

    const delBrand = (name) => {
        deleteBrand({name: name}).then(data =>
            setInfoToShow(data.message)
        )
        onHide()
        setInfoVisible(true)
    }
    const name = device.selectedBrand.name

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"

            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить Бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-row flex-wrap">
                    {device.brands.map(brand =>
                        <Card key={brand.id} className="m-2 p-2" style={{cursor: 'pointer'}}
                              onClick={() => device.setSelectedBrand(brand)}
                              border={brand.id === device.selectedBrand.id ? "info" : "light"}
                        >{brand.name}</Card>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={()=>{delBrand(name)}}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteBrand;