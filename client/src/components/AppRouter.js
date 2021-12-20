import React, {Component} from 'react';

import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Shop from "../pages/Shop";
import {SHOP_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const isAuth = false
    
    return (
            <Routes>
                {isAuth && authRoutes.map(({path, Component})=>
                <Route exact path={path} element={<Component/>} key={path}/>
                )}
                {publicRoutes.map(({path, Component})=>
                    <Route exact path={path} element={<Component/>} key={path}/>
                )}
                <Route path={'*'} element={<Shop/>}/>
            </Routes>


            );
            };

            export default AppRouter;