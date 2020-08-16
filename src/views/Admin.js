import React, {Component, useEffect, useState} from "react"
import ReactDOM from "react-dom";
import axios from "axios"
import {PostNav, LoggedInNav} from "./components/Nav"
import {Topics} from "./components/Topics"
import {PostEditFormat} from "./components/PostEditFormat"
import {Row, Col, Container, Button, Modal} from "react-bootstrap"
import {Info} from "./components/Info"
import {Footer, FooterInner} from "./components/Footer"

let promise = new Promise((resolve, reject) => {
    let search = window.location.href;
    let sent = search.substring(search.lastIndexOf('/') + 1);
    sent = sent == true
    if(resolve){
        resolve(sent)
    }else{
        reject("Rejected")
    }
})


const Admin = () => {
    const [user, setUser] = useState({})
    const [showSent, setShowSent] = useState(false)
    useEffect(() => {
        axios.get("/api/user").then(res => {
            setUser(res.data)
        }).catch(err => console.log(err.message))

        promise.then(sent => {
          setShowSent(sent)  
        }).catch(err => console.log(err))
    }, [])
    return (
        <>
            <LoggedInNav user={user}/>
            <Row>
                <Col sm={12} md={9} lg={9} className="center">
                    <div className="main-container">
                        <Topics classes="grey-bg"/>
                        <h4 className="paddinged">Publica un post</h4>
                        <PostEditFormat action="/api/post" method="post"/>
                        <SentPost show={showSent} handleClose={() => setShowSent(false)}/>
                    </div>
                </Col>
            </Row>
        </> 
    )   
}

const SentPost = (props) => {
    let handleClose = props.handleClose
    let show = props.showModal
    if(show){
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    return ""
} 


export default Admin