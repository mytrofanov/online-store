import React from 'react';

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Shop from "../pages/Shop";

const AppRouter = () => {
    const isAuth = true
    return (
            <Routes>
                <Route path='/' element={<Shop/>}/>
            </Routes>


            );
            };

            export default AppRouter;