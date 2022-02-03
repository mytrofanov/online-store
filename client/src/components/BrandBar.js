import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)


    return (
        <div className="d-flex flex-column flex-wrap">
            {device.brands !==undefined && device.brands.map(brand =>
                <Card key={brand.id} className="m-0 p-0" style={{cursor: 'pointer'}}
                      onClick={() => device.setSelectedBrand(brand)}
                      border={brand.id === device.selectedBrand.id ? "info" : "light"}
                >{brand.name}</Card>
            )}
        </div>

    );
});

export default BrandBar;