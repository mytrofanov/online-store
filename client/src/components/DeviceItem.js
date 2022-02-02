import React, {useEffect} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router"
import {DEVICE_ROUTE} from "../utils/consts";
import s from './style/DeviceItem.module.css'

const DeviceItem = ({device, brands, reviews}) => {
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

    const RatingCount = ({deviceId}) => {
        let sumOfRates = 0
        let count = 0
        let tRating = 0
        let star = '☆'
        let Text = ({number}) => {
            if (number === 1 ) {return (<span>отзыв </span>)}
            if (number > 1 && number <5 ) {return (<span>отзыва </span>)}
            if (number > 5 ) {return (<span>отзывов </span>)}
        }
        reviews.reviews.forEach(item => {
            if (item.deviceId === deviceId) {
                sumOfRates += item.rate
                count +=1
    }})
        count > 0 ? tRating = sumOfRates / count : tRating = 0
        let ratingStar = star.repeat(Math.round(tRating))
        return (
            <span id={reviews.reviews.id}>
                {tRating > 0 ?
                    <span>
                    <b>{ratingStar} </b>
                    <span>{count}</span>
                        <Text number = {count}/>
                     </span>
                    : <span></span>}
            </span>
        )

    }


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
                </div>
                <div className={s.rating}>
                    <RatingCount deviceId = {device.id}/> </div>
                <div> {device.name} </div>
            </Card>

        </Col>
    );
};

export default DeviceItem;