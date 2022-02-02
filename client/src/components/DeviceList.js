import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer( () => {
    const {device} = useContext(Context)
    const {reviews} = useContext(Context)
    const brands = device.brands

    return (
        <Row className="d-flex">
            {device.devices.map(device=>
                <DeviceItem key={device.id} device={device} brands = {brands} reviews={reviews}/>
            )}
        </Row>
    );
});

export default DeviceList;