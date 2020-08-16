import React, {Component} from "react"
import ReactDOM from "react-dom";
import {Row, Col, Container, Card, Button, ListGroup} from "react-bootstrap"
import Video from "./Video"

const Other = (props) => (
    <a href={"/posts/"+props._id} className="post-others-container">
        <ListGroup className="flex">
            <ListGroup.Item>
                <div className="post-others-img">
                    {props.hasvideo ? <Video src={props.media}/> : <img src={props.media}/>}
                </div>
                <div className="description">
                    <h6 className="bold">{props.title}</h6>
                    {props.description}
                </div>
            </ListGroup.Item>
        </ListGroup>
    </a>
)   

export {Other}