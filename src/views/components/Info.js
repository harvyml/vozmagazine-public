import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Navbar, NavDropdown, Nav, Carousel, Row, Col, Button} from "react-bootstrap"
const Info = () => {
    const [current, setCurrent] = useState("app")
    function handleClick(e){
        setCurrent(e.key)
        console.log(e.key)
    }
    
    return(
        <Row>
            <Col sm={12} md={12} lg={12} className="grey-bg">
                <div className="float-center center paddinged us">
                    <h4 className="bold paddinged">Nosotros</h4>
                    <p>
                        Somos un grupo de jóvenes lleno de ideas que están 
                        cansados de las formas tradicionales de hacer periodismo. 
                        Buscamos que la gente no solo conozca los sucesos de su entorno, sino que 
                        logre entenderlos a profundidad. También queremos buscar humanizar 
                        la labor del periodista, que la subjetividad no sea un impedimento para saber informar.
                    </p>
                    <Button className="float-center lila-bg" variant="dark" href="mailto:vozmagazineco@gmail.com">Publica con nosotros</Button>
                </div>
            </Col>
            <Col sm={12} md={12} lg={12} className="info">
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <div className="img-container">
                            <img src="./assets/work-table.jpeg"/>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={6} className="description-container">
                        <div className="description">
                            <h3 className="margined">¿Qué hacemos?</h3>
                            <p>Creamos contenido audiovisual, visual y escrito con un enfoque 
                                artístico y educativo que se ajustará a los temas semanales que 
                                manejaremos dependiendo de la coyuntura actual. Si quieres apoyarnos, 
                                puedes donarnos en <a className="lila" href="https://www.patreon.com/vozmagazine">https://www.patreon.com/vozmagazine</a></p>
                        </div>
                    </Col>
                    {/** second */}
                    <Col sm={12} md={6} lg={6} className="description-container">
                        <div className="description">
                            <h3 className="margined">¿Cómo lo hacemos?</h3>
                            <p>
                                Esto lo logramos definiendo cuales son los formatos que más 
                                consumen las personas y la implementación de estos en un día diferente de la semana. 
                                Tenemos el equipo suficiente (tanto de mano humana como tecnológico) para 
                                crear contenido de calidad. Además, trabajamos de la mano de un ingeniero de sistemas, 
                                que se encarga del mantenimiento y actualización de la página web.
                            </p>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <div className="img-container">
                            <img src="./assets/team-work.jpeg"/>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export {Info}