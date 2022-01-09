import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/createBrand";
import CreateType from "../components/modals/createType";
import CreateDevice from "../components/modals/createDevice";
import DeleteType from "../components/modals/deleteType";
import * as PropTypes from "prop-types";
import DeleteBrand from "../components/modals/deleteBrand";
import InfoModal from "../components/modals/infoModal";

function DeleteTypeBrand() {
    return null;
}

DeleteTypeBrand.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func
};
const Admin = () => {
    let [brandVisible, setBrandVisible] = useState(false)
    let [delBrandVisible, setDelBrandVisible] = useState(false)
    let [typeVisible, setTypeVisible] = useState(false)
    let [deleteTypeVisible, setDelTypeVisible] = useState(false)
    let [deviceVisible, setDeviceVisible] = useState(false)
    let [infoVisible, setInfoVisible] = useState(false)
    let [infoToShow, setInfoToShow] = useState('')

    return (
        <Container className="d-flex flex-column">
            <div className="d-flex mx-auto">
                <Button variant={"outline-dark"} className="m-lg-2 pt-1"
                        onClick={()=>{setTypeVisible(true)}}
                >Добавить тип</Button>
                <Button variant={"outline-dark"} className="m-lg-2 pt-1"
                        onClick={()=>{setDelTypeVisible(true)}}
                >Удалить тип</Button>
            </div>
            <div className="d-flex mx-auto">
                <Button variant={"outline-dark"} className="m-lg-2 pt-1"
                        onClick={()=>{setBrandVisible(true)}}
                >Добавить бренд</Button>
                <Button variant={"outline-dark"} className="m-lg-2 pt-1"
                        onClick={()=>{setDelBrandVisible(true)}}
                >Удалить бренд</Button>
            </div>
            <div className="d-flex mx-auto">
                <Button variant={"outline-dark"} className="m-lg-2 pt-1"
                        onClick={()=>{setDeviceVisible(true)}}
                >Добавить устройство</Button>

            </div>


            <CreateBrand show={brandVisible} onHide={()=>{setBrandVisible(false)}}/>
            <DeleteBrand setInfoToShow={setInfoToShow}
                         show={delBrandVisible} onHide={()=>{setDelBrandVisible(false)}}/>
            <CreateType show={typeVisible} onHide={()=>{setTypeVisible(false)}}/>
            <DeleteType show={deleteTypeVisible}
                        setInfoToShow={setInfoToShow}
                        setInfoVisible={setInfoVisible}
                        onHide={()=>{setDelTypeVisible(false)}}/>
            <CreateDevice show={deviceVisible} onHide={()=>{setDeviceVisible(false)}}/>

            <InfoModal show={infoVisible}
                       infoMessage = {infoToShow}
                       onHide={()=>{setInfoVisible(false)}}/>    {/*shows the result of any action*/}
        </Container>
    );
};

export default Admin;