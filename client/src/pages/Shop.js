import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/pages";
import InfoModal from "../components/modals/infoModal";

const Shop = observer(() => {
    const {device} = useContext(Context)
    const {info} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 10).then(data => {
            if (data===null || data === undefined){
                info.setInfoShop('Отсутствует связь с Базой Данных!')
                info.setInfoShopVisible(true)
            } else {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            }
        })
    }, [])
    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            if (data===null || data === undefined){
                info.setInfoShop('Отсутствует связь с Базой Данных!')
                info.setInfoShopVisible(true)
            } else {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            }

        })
    }, [device.page, device.selectedType, device.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>

            </Row>

            <InfoModal show={info.infoShopVisible}
                       infoMessage={info.infoShop}
                       onHide={() => {
                           info.setInfoShopVisible(false)
                           info.setInfoShop('')
                       }}/> {/*shows the result of any action*/}

        </Container>
    );
});

export default Shop;