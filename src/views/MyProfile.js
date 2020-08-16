import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom";
import {PostNav} from "./components/Nav"
import {Topics} from "./components/Topics"
import {FooterInner} from "./components/Footer"
import Info from "./components/Profile/Info"
import {Row, Col} from "react-bootstrap"
import axios from "axios"

const MyProfile = () => {
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
            <PostNav user={user}/>
            <div className="main-container profile">
                <Topics classes="grey-bg"/>
                <Row>
                    {/* <Col sm={12} md={2} lg={2} className="grey-bg sidebar">
                        <h5>Panel</h5>
                        <ul>
                            <li><a className="lila" href="#some">Post que te han gustago</a></li>
                            <li><a className="lila" href="#some">Tus comentarios</a></li>
                        </ul>
                    </Col> */}
                    <Col sm={12} md={12} lg={12}>
                        <Info user={user}/>
                    </Col>
                </Row>
            </div>
            <FooterInner />
        </> 
    )   
}  

export default MyProfile