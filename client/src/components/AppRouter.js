import React, {Component, useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Shop from "../pages/Shop";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    
    return (
            <Routes>
                {user._isAuth && authRoutes.map(({path, Component})=>
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