import React, {Component, useState, useEffect} from "react"
import ReactDOM from "react-dom";
import {Nav} from "./components/Nav"
import {Topics} from "./components/Topics"
import {PostsLine} from "./components/PostsLine"
import {PostFormat} from "./components/PostFormat"
import {Row, Col, Container, Spinner} from "react-bootstrap"
import {Info} from "./components/Info"
import {Footer} from "./components/Footer"
import axios from "axios";

const Posts = () => {
    //bring user
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get("/api/user").then(async snap => {
            await setUser(snap.data)
            console.log(user)
        })
    }, [])
    //===================================
    const [loading, setLoading] = useState(false)
    //voz opina
    const [vozopina, setVozopina] = useState([])
    //enterate con voz
    const [enterate, setEnterate] = useState([])
    //al lente de voz
    const [alLente, setAlLente] = useState([])
    //voz en trazos
    const [trazos, setTrazos] = useState([])
    //colabora con voz
    const [colabora, setColabora] = useState([])
    useEffect(() => {
        async function fetchPosts(){
            //set loading
            setLoading(true)
            //vozopina
            await bringPosts("vozopina").then(snap => {
                setVozopina(snap.data)
            }).catch(err => console.log(err.message))
            //enterate
            await bringPosts("enterate").then(snap => {
                setEnterate(snap.data)
            }).catch(err => console.log(err.message))
            //lente
            await bringPosts("lente").then(snap => {
                setAlLente(snap.data)
            }).catch(err => console.log(err.message))
            //trazos
            await bringPosts("trazos").then(snap => {
                setTrazos(snap.data)
            }).catch(err => console.log(err.message))
            //colabora
            await bringPosts("colabora").then(snap => {
                setColabora(snap.data)
            }).catch(err => console.log(err.message))
            setLoading(false)
        }
        fetchPosts()
    }, [])
    
    return (
        <>
            <Nav user={user}/>
            <div className="main-container">
                <Topics classes="grey-bg"/>
                {loading ? <Loading /> : ""}
                <PostsLine title="Voz Opina" posts={vozopina}/>
                <PostsLine title="Enterate con Voz" posts={enterate}/>
                <PostsLine title="Al lente de voz" posts={alLente}/>
                <PostsLine title="Voz en trazos" posts={trazos}/>
                <PostsLine title="Colabora con Voz" posts={colabora}/>
            </div>
            <Footer/>
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

async function bringPosts(from){
    return await axios.get("/api/posts", {
        params: {
            category: from
        }
    })
}
    

export default Posts