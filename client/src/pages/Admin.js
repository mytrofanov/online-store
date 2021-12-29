import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/createBrand";
import CreateType from "../components/modals/createType";
import CreateDevice from "../components/modals/createDevice";

const Admin = () => {
    let [brandVisible, setBrandVisible] = useState(false)
    let [typeVisible, setTypeVisible] = useState(false)
    let [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
           <Button variant={"outline-dark"} className="mt-2 pt-1"
           onClick={()=>{setTypeVisible(true)}}
           >Добавить тип</Button>
           <Button variant={"outline-dark"} className="mt-2 pt-1"
           onClick={()=>{setBrandVisible(true)}}
           >Добавить бренд</Button>
           <Button variant={"outline-dark"} className="mt-2 pt-1"
           onClick={()=>{setDeviceVisible(true)}}
           >Добавить устройство</Button>

            <CreateBrand show={brandVisible} onHide={()=>{setBrandVisible(false)}}/>
            <CreateType show={typeVisible} onHide={()=>{setTypeVisible(false)}}/>
            <CreateDevice show={deviceVisible} onHide={()=>{setDeviceVisible(false)}}/>
        </Container>
    );
};

export default Admin;