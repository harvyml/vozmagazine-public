import React, {Component, useState, useEffect} from "react"
import ReactDOM from "react-dom";
import {Nav} from "./components/Nav"
import {Topics} from "./components/Topics"
import {Footer} from "./components/Footer"
import axios from "axios"

const Semana = () => {
    //bring user
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get("/api/user").then(snap => {
            setUser(snap.data)
        })
    }, [])
    //===================================
    return (
        <>
            <Nav user={user}/>
            <div className="main-container">
                <Topics classes="grey-bg"/>
                <div className="tema-semanal">
                    <div className="img-container">
                        <img src="./assets/2020-07(20-26).jpg"/>
                    </div>
                </div>
            </div>
            <Footer />
        </> 
    )   
}  

export default Semana