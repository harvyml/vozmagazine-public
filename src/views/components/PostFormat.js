import React, {Component, useEffect, useState} from "react"
import ReactDOM from "react-dom";
import {Row, Col, Container, Card, Button, ListGroup} from "react-bootstrap"
import {Other} from "./Other"
import MarkDown from "react-remarkable"
import { SideMain } from "./SideMain";
import {UploadComment} from "./UploadComment"
import Video from "./Video"
import axios from "axios";

const toArr = tags => {
    return tags.split(",")
}

const fecha = ms => {
    let date = new Date(ms)
    return date
}

const PostFormat = (props) => {
    const [datePost, setDatePost] = useState("")
    const [likes, setLikes] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [likesLength, setLikesLength] = useState(0)
    const [comments, setComments] = useState([])
    useEffect(() => {
        setDatePost(fecha(props.datems).toLocaleDateString())
        //comentarios
        setComments(props.comments)
    }, [props.datems])

    useEffect(() => {
        setLikes(props.likes)
        setLikesLength(props.likes ? props.likes.length : 0)
        console.log(props.likes)
    }, [props.likes])

    useEffect(() => {
        let liked = likes.indexOf(props.user._id) != -1
        setIsLiked(liked)
    }, [likes])

    //send a like to the post
    function like(){
        //params for this: _id (post id) and userId
        if(props.user._id){
            axios.post("/api/like", {
                _id: props._id
            }).then((res) => {
                console.log("respuesta de like", res)
                // setLikesLength(res.data.likes.length)
            })
              .catch(err => console.log(err.message))
        }else{
            window.location.href = "/login"
        }
        
    }

    

    return(
        <Row className="post-row">
            <Col sm={12} md={8} lg={8}>
                <div className="post-container" itemScope itemType="http://schema.org/Article">
                    <div className="post-title">
                        <h1 itemProp="name">{props.title}</h1>
                        <div className="post-description">
                            <span className="light-black">{props.description}</span>
                        </div>
                        {
                            toArr(props.tags ? props.tags : "").map((t, i) => {
                                return <Button variant="light" className="italic" key={i}>{t}</Button>
                            })
                        }
                    </div>
                    <div className="post-img-container">
                        {props.hasvideo ? <Video src={props.media}/> : <img src={props.media} alt={props.title}/>}
                    </div>
                    <div className="social-media margined">
                        {
                            isLiked ? (
                                <Button variant="light" className="lila-light-bg" onClick={() => {
                                    like()
                                    setIsLiked(!isLiked)
                                }}><img src="../assets/like.png"/><span className="like-margin lila small">{likesLength+1}</span></Button>
                            ) : (
                                <Button variant="light" onClick={async () => {
                                    like()
                                    setIsLiked(!isLiked)
                                }}><img src="../assets/like.png"/><span className="like-margin">{likesLength}</span></Button>
                            )
                        }
                        <div class="fb-share-button" data-href={window.location.href} data-layout="box_count" data-size="small"><a target="_blank" href={window.location.href} class="fb-xfbml-parse-ignore">Compartir</a></div>
                    </div>
                    <div className="data">
                        <span className="">Por: <span itemProp="author">{props.author}</span></span><br/>
                        <span className="">Fecha: <span itemProp="dateCreated">{datePost}</span></span>
                    </div>
                    <div className="post-description">
                        <MarkDown itemProp="articleBody" source={props.markdown}/>
                    </div>
                    {
                        <div className="comments">
                            {comments.map((comment, i) => {
                                if(comment.userId == props.user._id){
                                    return <MyComment {...comment} key={i} />
                                }
                                return <Comment {...comment} key={i}/>
                            })}
                        </div>
                    }

                    {props.user ? <UploadComment userId={props.user} postId={props._id}/> : <h5 className="bold lila paddinged default-font center">Inicia sesión para opinar</h5>}
                    
                </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
                <SideMain sideMain={props.sideMain} />
                {
                    props.sidePosts.map((post, i) => {
                        return (
                            <Other {...post} key={i}/>
                        )
                    })
                }
            </Col>
        </Row>
    )
}

const MyComment = props => {
    const [date, setDate] = useState("")
    useEffect(() => {
        setDate(fecha(props.date).toLocaleDateString())
    }, [props.date])
    return(
        <div className="comment paddinged">
            <div className="name">
                <h6 className="bold">{props.name}</h6>
            </div>
            <div className="markdown">
                <MarkDown itemProp="articleBody" source={props.markdown} />
            </div>
            <div className="date entire-width light-black paddinged-more-bottom">
                {/* For the next version */}
                {/* <Button variant="light" className="btn-small"><img src="../assets/like.png" /></Button> */}
                <span className="right">{date}</span>
            </div>
        </div>
    )
}

const Comment = props => {
    const [date, setDate] = useState("")
    useEffect(() => {
        setDate(fecha(props.date).toLocaleDateString())
    }, [props.date])
    return(
        <div className="comment paddinged">
            <div className="name">
                <h6 className="bold">{props.name}</h6>
            </div>
            <div className="markdown">
                <MarkDown itemProp="articleBody" source={props.markdown} />
            </div>
            <div className="date entire-width light-black paddinged-more-bottom">
                {/* For the next version */}
                {/* <Button variant="light" className="btn-small"><img src="../assets/like.png" /></Button> */}
                <span className="right">{date}</span>
            </div>
        </div>
    )
}





export {PostFormat}