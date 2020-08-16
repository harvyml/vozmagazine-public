import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Navbar, NavDropdown, Nav, Carousel} from "react-bootstrap"

const headerStyles = {
    background: "#000000",
    height: "auto"
}
const navStyles = {
    background: "#000000",
    color: "#ffffff"
}


const CustomedHeader = (props) => {
    if(props.user){
        return <CustomedHeaderLoggedIn user={props.user}/>
    }else{
        return <CustomedHeaderNotLoggedIn/>
    }
}
const CustomedHeaderNotLoggedIn = () => {
    return(
        <>
            <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="/" className="bold"><img src="./assets/logo.jpg" className="logo-img"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/posts">Noticias</Nav.Link>
                    <Nav.Link href="/semana">Tema de la semana</Nav.Link>
                    <NavDropdown title="Secciones" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/temas/vozopina">Voz Opina</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/enterateconvoz">Enterate Con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/educacion">Al lente con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/vozentrazos">Voz en trazos</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/colaboraconvoz">Colabora Con Voz</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    {/* {<Nav>
                    <Nav.Link href="#deets">Nosotros</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Quienes Somos
                    </Nav.Link>
                    </Nav>} */}
                </Navbar.Collapse>
            </Navbar>
            <Banner/>
        </>
    )
};

const CustomedHeaderLoggedIn = props => {
    const [current, setCurrent] = useState("app")
    function handleClick(e){
        setCurrent(e.key)
        console.log(e.key)
    }
    return(
        <>
            <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="/" className="bold"><img src="./assets/logo.jpg" className="logo-img"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/posts">Noticias</Nav.Link>
                    <Nav.Link href="/semana">Tema de la semana</Nav.Link>
                    <NavDropdown title="Secciones" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/temas/vozopina">Voz Opina</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/enterateconvoz">Enterate Con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/educacion">Al lente con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/vozentrazos">Voz en trazos</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/colaboraconvoz">Colabora Con Voz</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">{props.user.name}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Banner/>
        </>
    )
}

const Banner = () => {
    return (
        <>
            <div className="banner">
                <Carousel className="hide-on-med-and-down">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./assets/laptop/1.jpeg"
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./assets/laptop/2.jpeg"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./assets/laptop/3.jpeg"
                        alt="Third slide"
                        />

                        {/* in case of wanting to use the caption
                        {<Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>} */}
                    </Carousel.Item>
                </Carousel>
                <Carousel className="show-on-small">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./assets/mobile/manwalking.jpeg"
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./assets/mobile/view.jpeg"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./assets/mobile/camera.jpeg"
                        alt="Third slide"
                        />

                        {/* in case of wanting to use the caption
                        {<Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>} */}
                    </Carousel.Item>
                </Carousel>
                <Carousel.Caption>
                    <h3  className="paddinged">Voz Magazine</h3>
                    <p>Somos la voz de quienes no la tienen, mostramos lo que el mundo necesita a través del arte.</p>
                    <span className="grey italic">- Periodismo y arte con conciencia</span>
                </Carousel.Caption>
            </div>
            <div className="layer"></div>
        </>
    )
}


  export {CustomedHeader}