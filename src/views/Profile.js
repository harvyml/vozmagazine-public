import React, {Component, useState, useEffect} from "react"
import ReactDOM from "react-dom";
import {Nav, PostNav} from "./components/Nav"
import {Topics} from "./components/Topics"
import {FooterInner} from "./components/Footer"
import {PostCard} from "./components/PostCard"
import {Row, Col} from "react-bootstrap"
import axios from "axios"

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

const Profile = () => {
    //bring user
    const [user, setUser] = useState({})
    const [alienuser, setAlienuser] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        authUser()
        promise.then(id => {
            axios.get("/api/alienuser", {
                params:{
                    _id: id
                }
            }).then(res => {
                setAlienuser(res.data)
                alienUserPosts(res.data._id)
                setLoading(false)
            }).catch(err => console.log("Coudn't bring bosts"))
        }).catch(err => console.log(err))
    }, [])

    function alienUserPosts(_id){
        axios.get("/api/alienuserposts", {
            params:{
                _id: _id
            }
        }).then(res => {
            setPosts(res.data)
        }).catch(err => console.log(err.message))
    }

    function authUser(){
        axios.get("/api/user").then(res => {
            setUser(res.data)

        }).catch(err => console.log("coudnt find any logged user"))
    }
    //===================================
    return (
        <>
            <PostNav user={user}/>
            <div className="main-container">
                <Topics classes="grey-bg"/>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <div className="profile paddinged">
                            <div className="name">
                                <h4>{alienuser.name}</h4>
                            </div>
                            <div className="description">
                                <p>
                                    {alienuser.description}
                                </p>
                            </div>
                            <h6 className="bold">Posts de {alienuser.name}</h6>
                            <Col sm={12} md={12} lg={12} className="topic">
                                {
                                    posts ? posts.map((post, i) => {
                                        return <PostCard post={post} key={i}/>
                                    }) : ""
                                }
                            </Col>
                        </div>
                    </Col>
                </Row>
            </div>
            <FooterInner />
        </> 
    )   
}  


export default Profile