import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    const clearFilters = () => {
        device.setSelectedType({})
        device.setSelectedBrand({})
    }

    return (
        <ListGroup>
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
            <Button onClick={() => {
                clearFilters()
            }}
            >Сбросить все фильтры</Button>
        </ListGroup>

    );
});

export default TypeBar;