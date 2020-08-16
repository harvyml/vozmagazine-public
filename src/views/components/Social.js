import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Navbar, NavDropdown, Nav, Carousel, Row, Col} from "react-bootstrap"
const Info = () => {
    const [current, setCurrent] = useState("app")
    function handleClick(e){
        setCurrent(e.key)
        console.log(e.key)
    }
    return(
        <Row>
            <Col sm={12} md={6} lg={6}>
                
            </Col>
        </Row>
    )
};

export {Info}