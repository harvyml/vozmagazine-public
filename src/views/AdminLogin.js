import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Card, Button, Form, Row, Col} from "react-bootstrap"
import {PostNav} from "./components/Nav"
import {Footer} from "./components/Footer"
const AdminLogin = () => {
    return(
        <>
        <PostNav/>
        <Row className="login-row">
            <Col sm={12} md={6} lg={6} className="float-center">
                <Form action="/api/loginadmin" method="post">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Inicia Sesión
                    </Button>
                </Form>
            </Col>
        </Row>
        </>
    )
};

export default AdminLogin