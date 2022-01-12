import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import InfoStore from "./store/InfoStore";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null)



ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        info: new InfoStore(),
        device: new DeviceStore(),
        basket: new BasketStore()
    }}>
        <App/>
    </Context.Provider>,

    document.getElementById('root')
)
;
