import React, {useState, useEffect} from "react"
import {PostCard} from "../PostCard"
import {Row, Col, Spinner} from "react-bootstrap"
import axios from "axios"

const Info = (props) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchPosts(){
            setLoading(true)
            await axios.get("/api/postsbyid", {
                params:{
                    _id: props.user._id
                }
            }).then(async posts => {
                setPosts(posts.data)
            }).catch(err => console.log(err))
            setLoading(false)
        }
        fetchPosts()
    }, [])
    return (
        <>
            <div className="info-container paddinged">
                <div className="info">
                    {loading ? <Loading/> : ""}
                    <h4>{props.user.name}</h4>
                    Editor
                    <div className="divider"></div>
                    <Row className="topic-row profile-topic-row">
                    <h6 className="bold paddinged">Posts de {props.user.name}</h6>
                    <Col sm={12} md={12} lg={12} className="topic">
                        {
                            posts ? posts.map((post, i) => {
                                return <PostCard post={post} key={i}/>
                            }) : ""
                        }
                    </Col>
                    </Row>
                </div>
            </div>
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


export default Info