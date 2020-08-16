import React, {Component, useEffect, useState} from "react"
import ReactDOM from "react-dom";
import {Row, Col, Container, Card, Button, ListGroup} from "react-bootstrap"
import {Other} from "./Other"
import Video from "./Video"
import MarkDown from "react-remarkable"


const SideMain = props => {
    return (
        <a href={"/posts/"+props.sideMain._id} className="post-others-card-container">
            <Card className="post-others-card">
                {props.sideMain.hasvideo ? <Video src={props.sideMain.media}/> : <Card.Img variant="top" src={props.sideMain.media} />}
                <Card.Body>
                    <Card.Title>{props.sideMain.title}</Card.Title>
                    <Card.Text>
                    {props.sideMain.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </a>
    )
}

export {SideMain}