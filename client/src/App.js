import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer( () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        check().then(data=>{
            if (data !== undefined) {
                user.setUser(true)
                user.setIsAuth(true)
            }

        })
            .finally(()=>setLoading(false))
    },[])


    if (loading) {
        return (
            <div style={{height:'100vh', paddingLeft:'50%'}} >
            <Spinner animation={"border"} role={"status"} style={{marginTop:'50%'} } />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App;
