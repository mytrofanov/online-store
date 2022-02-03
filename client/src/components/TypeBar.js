import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, ListGroup} from "react-bootstrap";
import s from './style/TypeBar.module.css'
import InfoWarning from "./InfoWarning";
import BrandBar from "./BrandBar";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    const clearFilters = () => {
        device.setSelectedType({})
        device.setSelectedBrand({})
    }

    return (
        <div>
            <ListGroup>
                {device.types !==undefined && device.types.map(type =>
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
            <div className={s.filterModule}>
                <Button  variant="dark" onClick={() => {
                    clearFilters()
                }}
                >Сбросить все фильтры</Button>
            </div>

            <BrandBar/>

            <InfoWarning/>
        </div>


    );
});

export default TypeBar;