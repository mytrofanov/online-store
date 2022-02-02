import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import InfoStore from "./store/InfoStore";
import BasketStore from "./store/BasketStore";
import ReviewStore from "./store/ReviewStore";

export const Context = createContext(null)



ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        info: new InfoStore(),
        device: new DeviceStore(),
        basket: new BasketStore(),
        reviews: new ReviewStore()
    }}>
        <App/>
    </Context.Provider>,

    document.getElementById('root')
)
;
