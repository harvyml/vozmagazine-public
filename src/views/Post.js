import React, {Component, useEffect, useState} from "react"
import ReactDOM from "react-dom";
import axios from "axios"
import {PostNav} from "./components/Nav"
import {Topics} from "./components/Topics"
import {PostFormat} from "./components/PostFormat"
import {Row, Col, Container, Spinner} from "react-bootstrap"
import {Info} from "./components/Info"
import {Footer, FooterInner} from "./components/Footer"

let promise = new Promise((resolve, reject) => {
    let search = window.location.href;
    let id = search.substring(search.lastIndexOf('/') + 1);
    console.log(id)
    if(resolve){
        resolve(id)
    }else{
        reject("Rejected")
    }
})

const App = () => {
    //bring user
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get("/api/user").then(async snap => {
            await setUser(snap.data)
            console.log(user)
        })
    }, [])
    //=======================
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({})
    const [sideMain, setSideMain] = useState({})
    const [sidePosts, setSidePosts] = useState([])
    useEffect(() => {
        setLoading(true)
        promise.then((id) => {
            axios.get(`/api/post`, {
                params:{
                    _id: id
                }
            }).then(res => {
                setPost(res.data)
                setLoading(false)
            }).catch(err => console.log(err.message))
        })

        promise.then((id) => {
            axios.get(`/api/side`).then(res => {
                setSidePosts(res.data)
            }).catch(err => console.log(err.message))
        })

        promise.then((id) => {
            axios.get("/api/sidemain").then(res => {
                setSideMain(res.data)
            }).catch(err => console.log(err.message))
        })
    }, [])
    return (
        <>
            <PostNav user={user}/>
            <div className="main-container">
                <Topics classes="grey-bg"/>
                {loading ? <Loading /> :  <PostFormat user={user} {...post} sidePosts={sidePosts} sideMain={sideMain}/>}
            </div>
            <FooterInner/>
        </> 
    )   
}
    
const Loading = () => (
    <Row>
        <Col sm={12}>
            <div className="float-center center paddinged">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        </Col>
    </Row>
)


export default App