import React, {Component} from 'react';

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Shop from "../pages/Shop";

const AppRouter = () => {
    const isAuth = true
    return (
            <Routes>
                {isAuth && authRoutes.map(({path, Component})=>
                <Route exact path={path} element={<Component/>} key={path}/>
                )}
                {publicRoutes.map(({path, Component})=>
                    <Route exact path={path} element={<Component/>} key={path}/>
                )}
                
            </Routes>


            );
            };

            export default AppRouter;