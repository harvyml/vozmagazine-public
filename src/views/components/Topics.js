import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Navbar, NavDropdown, Nav, Carousel, Row, Col} from "react-bootstrap"
const Topics = (props) => {
    const [current, setCurrent] = useState("app")
    function handleClick(e){
        setCurrent(e.key)
        console.log(e.key)
    }
    return(
        <Nav className={"justify-content-center topics " + props.classes}
            >
            <Nav.Item>
                <Nav.Link className="lila" href="/temas/vozopina">Voz Opina</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="lila" href="/temas/enterate">Enterate con Voz</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="lila" href="/temas/lente">Al lente de Voz</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="lila" href="/temas/trazos">Voz en trazos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="lila" href="/temas/colabora">Colabora con Voz</Nav.Link>
            </Nav.Item>
        </Nav>
    )
};

export {Topics}