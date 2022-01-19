import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/createBrand";
import CreateType from "../components/modals/createType";
import CreateDevice from "../components/modals/createDevice";
import DeleteType from "../components/modals/deleteType";
import DeleteBrand from "../components/modals/deleteBrand";
import InfoModal from "../components/modals/infoModal";
import {fetchBrands, fetchTypes} from "../http/deviceAPI";
import {Context} from "../index";

const Admin = () => {
    let [brandVisible, setBrandVisible] = useState(false)
    let [delBrandVisible, setDelBrandVisible] = useState(false)
    let [typeVisible, setTypeVisible] = useState(false)
    let [deleteTypeVisible, setDelTypeVisible] = useState(false)
    let [deviceVisible, setDeviceVisible] = useState(false)
    let [infoVisible, setInfoVisible] = useState(false)
    let [infoToShow, setInfoToShow] = useState('')
    let [smthChanged, setSmthChanged] = useState(false)
    let [types, setTypes] = useState([])
    let [brands, setBrands] = useState([])
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => {
            setTypes([])
            data.map(i =>setTypes(value=> value.concat(i.name)))
            device.setTypes(data)
        })
        fetchBrands().then(data => {
            setBrands([])
            data.map(i =>setBrands(value=> value.concat(i.name)))
            device.setBrands(data)
        })
    }, [smthChanged])

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


            <CreateBrand show={brandVisible}
                         brands={brands}
                         setInfoToShow={setInfoToShow}
                         setInfoVisible={setInfoVisible}
                         setSmthChanged={setSmthChanged}
                         onHide={()=>{setBrandVisible(false)}}/>
            <DeleteBrand setInfoToShow={setInfoToShow}
                         setInfoVisible={setInfoVisible}
                         setSmthChanged={setSmthChanged}
                         show={delBrandVisible} onHide={()=>{setDelBrandVisible(false)}}/>
            <CreateType show={typeVisible}
                        types = {types}
                        setInfoToShow={setInfoToShow}
                        setInfoVisible={setInfoVisible}
                        infoVisible = {infoVisible}
                        setSmthChanged={setSmthChanged}
                        onHide={()=>{setTypeVisible(false)}}/>
            <DeleteType show={deleteTypeVisible}
                        setInfoToShow={setInfoToShow}
                        setInfoVisible={setInfoVisible}
                        setSmthChanged={setSmthChanged}
                        onHide={()=>{setDelTypeVisible(false)}}/>
            <CreateDevice show={deviceVisible}
                          setInfoToShow={setInfoToShow}
                          setInfoVisible={setInfoVisible}
                          onHide={()=>{setDeviceVisible(false)}}/>

            <InfoModal show={infoVisible}
                       infoMessage = {infoToShow}
                       onHide={()=>{setInfoVisible(false)}}/>    {/*shows the result of any action*/}
        </Container>
    );
};

export default Admin;