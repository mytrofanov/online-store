import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import Basket from "./pages/Basket";

const App = observer( () => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if (user.triedToLogin === true) {
            check().then(data=>{
                if (data !== undefined) {
                    console.log(data)
                    user.setUser(true)
                    user.setIsAuth(true)
                }
            })
                .finally(()=>setLoading(false))
        }
        setLoading(false)
    },[])
    const openBasket = () => {
        basket.setBasketVisible(true)
        basket.setAskForBasket(!basket.askForBasket)
    }

    if (loading) {
        return (
            <div style={{height:'100vh', paddingLeft:'50%'}} >
            <Spinner animation={"border"} role={"status"} style={{marginTop:'50%'} } />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <NavBar openBasket={openBasket}/>
            <AppRouter/>
            <Basket onHide={() => {
                basket.setBasketVisible(false)
            }} show={basket.basketVisible}/>
        </BrowserRouter>
    );
})

export default App;
