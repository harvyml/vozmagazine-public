import React, {Component, useState, useEffect} from "react"
import ReactDOM from "react-dom";
import {PostNav as Nav} from "./components/Nav"
import {Topics} from "./components/Topics"
import {PostsLine} from "./components/PostsLine"
import {PostFormat} from "./components/PostFormat"
import {Row, Col, Container, Spinner} from "react-bootstrap"
import {Info} from "./components/Info"
import {Footer, FooterInner} from "./components/Footer"
import axios from "axios";
import { PostCard } from "./components/PostCard";


let promise = new Promise((resolve, reject) => {
    let search = window.location.href;
    let category = search.substring(search.lastIndexOf('/') + 1);
    console.log(category)
    if(resolve){
        resolve(category)
    }else{
        reject("Rejected")
    }
})

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
    //Load  More line 
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(9)
    const trackScrolling = async () => {
        const wrappedElement = document.querySelector('.load-more-line');
        if (isBottom(wrappedElement)) {
            setLimit(limit+9)
            window.removeEventListener("scroll", trackScrolling)
        }
    };
    function isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
    const [posts, setPosts] = useState([])


    useEffect(() => {
        window.addEventListener("scroll", trackScrolling)
    }, [limit])
    useEffect(() => {
        //get category from path 
        setLoading(true)
        promise.then(category => {
            bringPosts(category, limit).then(res => {
                setPosts(res.data)
                setLoading(false)
            })
        })
    }, [limit])

    return (
        <>
            <Nav user={user}/>
            <div className="main-container">
                <Topics classes="grey-bg"/>
                {loading ? <Loading /> : ""}
                <Row className="topic-row">
                    <Col sm={12} md={12} lg={12} className="topic">
                        {
                            posts ? posts.map((post, i) => {
                                return <PostCard post={post} key={i}/>
                            }) : ""
                        }
                    </Col>
                </Row>
            </div>
            <div className="load-more-line"></div>
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

async function bringPosts(from, limit){
    console.log(from, limit)
    return await axios.get("/api/postslimit", {
        params: {
            category: from,
            limit: limit
        }
    })
}

export default Posts