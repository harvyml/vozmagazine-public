import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Card, Button, Form, Row, Col, Modal} from "react-bootstrap"
import {PostNav} from "./components/Nav"
import {Footer} from "./components/Footer"


const Register = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error') == "true"
    const [showerror, setShowerror] = useState(error)

    const [firstPassword, setFirstPassword] = useState("") 
    const [secondPassword, setSecondPassword] = useState("")
    return(
        <>
        <PostNav/>
        <Row className="login-row">
            <ModalError show={showerror} handleClose={() => setShowerror(false)}/>
            <Col sm={12} md={6} lg={6} className="float-center">
                <div className="float-center center paddinged">
                    <h6 className="bold">Registrate</h6>
                </div>
                <Form action={validateForm(firstPassword, secondPassword)} method="post">
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Nombre" name="name"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Correo electronico" name="email"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Contraseña" name="password" onChange={(e) => setFirstPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Repetir contraseña" onChange={(e) => {
                            setSecondPassword(e.target.value)
                            inputValidation(e, firstPassword, e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <a href="/login" className="lila small">¿Ya tienes cuenta? Inicia sesión Aquí</a>
                    </Form.Group>
                    <Button variant="dark" className="lila-bg" type="submit">
                        Registrate
                    </Button>
                </Form>
            </Col>
        </Row>
        </>
    )
};

function inputValidation (e, firstPassword, secondPassword){
    if(firstPassword == secondPassword){
        e.target.style.cssText = "color: green; background: rgba(0, 255, 34, 0.2);"
    }else{
        e.target.style.cssText = "color: red; background: rgba(255, 1, 0, 0.2);"
    }
}

function validateForm (firstPassword, secondPassword){
    if(firstPassword == secondPassword){
        return "/api/register"
    }else{
        return "/api/reg?error=true"
    }
}

const ModalError = (props) => (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color: "red"}}>Parece que hay algún error con los datos que ingresaste, por favor intentalo de nuevo.</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Cerrar
            </Button>
        </Modal.Footer>
    </Modal>
)
export default Register