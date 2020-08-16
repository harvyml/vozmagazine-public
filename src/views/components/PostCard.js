import React, {Component} from "react"
import ReactDOM from "react-dom";
import {Row, Col, Container, Card, Button, ListGroup} from "react-bootstrap"
import {Other} from "./Other"
import Video from "./Video"
import MarkDown from "react-remarkable"

const PostCard = (props) => {
    return(
        <Card className="post-card">
            {props.post.hasvideo ? <Video src={props.post.media} className="card-img-top"/> : <a href={"/posts/" + props.post._id}><Card.Img variant="top" src={props.post.media} /></a>}
            <Card.Body>
                <Card.Title><a href={"/posts/" + props.post._id}>{props.post.title}</a></Card.Title>
                <Card.Text>
                <a href={"/posts/" + props.post._id}>{props.post.description}</a>
                </Card.Text>
                <Button variant="light" className="lila-bg white" href={"/posts/" + props.post._id}>Ver</Button>
            </Card.Body>
        </Card>
    )
}

export {PostCard}