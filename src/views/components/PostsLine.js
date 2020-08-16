import React, {Component} from "react"
import ReactDOM from "react-dom";
import {Row, Col, Container, Card, Button, ListGroup} from "react-bootstrap"
import {Other} from "./Other"
import {PostCard} from "./PostCard"
import MarkDown from "react-remarkable"

const PostsLine = (props) => {
    return(
        <Row className="posts-row paddinged">
            <h6 className="bold">{props.title}</h6>
            <Col sm={12} md={12} lg={12} className="line-of-posts-container">
                <div className="line-of-posts flex">
                    {props.posts ? props.posts.map((post, i) => {
                        return <PostCard post={post} key={i}/>
                    }) : ""}
                </div>
            </Col>
        </Row>
    )
}


export {PostsLine}