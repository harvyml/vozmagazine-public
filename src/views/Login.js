import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Card, Button, Form, Row, Col} from "react-bootstrap"
import {PostNav} from "./components/Nav"
import {Footer} from "./components/Footer"
const Login = () => {
    return(
        <>
        <PostNav/>
        <Row className="login-row">
            <Col sm={12} md={6} lg={5} className="float-center">
                <h6 className="bold center paddinged">Inicia Sesión</h6>
                <Form action="/api/login" method="post">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" name="email"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" name="password"/>
                    </Form.Group>
                    <Form.Group>
                        <a href="/registrate" className="lila small">¿Aun no tienes cuenta? Registrate aquí</a>
                    </Form.Group>
                    <Button variant="dark" className="lila-bg" type="submit">
                        Inicia Sesión
                    </Button>
                </Form>
            </Col>
        </Row>
        </>
    )
};


export default Login