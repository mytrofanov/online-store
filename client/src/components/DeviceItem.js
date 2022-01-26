import React, {useEffect} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router"
import {DEVICE_ROUTE} from "../utils/consts";
import s from './style/DeviceItem.module.css'

const DeviceItem = ({device, brands}) => {
    const navigate = useNavigate();
    const gotoDevice= (dev)=>{
        navigate(DEVICE_ROUTE + '/' + dev)
    }

    let idFromPath = window.location.search.split('id=')

    useEffect(()=>{
        if (idFromPath[1] !== undefined && idFromPath[1].match(/\d/) !== null) {
            gotoDevice(idFromPath[1])
        }
    },[idFromPath])

    return (
        <Col md={3} className={"mt-3"} onClick={() => {
            gotoDevice(device.id)
        }}>
            <Card className={s.card} border={'light'}>
                <Image src={process.env.REACT_APP_API_URL   +  device.img} className={s.image}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">

                    {  brands.map(brand =>
                        brand.id === device.brandId && brand.name )
                    }

                    <div> Rating {device.rating} <span style={{}}>☆</span></div>
                </div>
                <div> {device.name} </div>
            </Card>

        </Col>
    );
};

export default DeviceItem;