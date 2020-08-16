import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom";
import {CustomedHeader} from "./components/CustomedHeader"
import {Topics} from "./components/Topics"
import {Row, Col, Container} from "react-bootstrap"
import {Info} from "./components/Info"
import {Footer} from "./components/Footer"
import axios from "axios";

const App = () => {
    //bring user
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get("/api/user").then(async snap => {
            await setUser(snap.data)
            console.log(user)
        })
    }, [])
    return (
        <>
            <CustomedHeader user={user}/>
            <Topics/>
            <Info/>
            <Footer />
        </> 
    )   
}
    

export default App
