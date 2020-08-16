import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Navbar, NavDropdown, Nav, Carousel} from "react-bootstrap"

{
    // Politica
    // Voz Opina
    // Enterate con Voz
    // Al lente de Voz
    // Voz en trazos
    // Colabora con Voz
}

const MainNav = (props) => {
    if(props.user){
        return <LoggedInMainNav user={props.user}/>
    }else{
        return <NotLoggedInMainNav />
    }
};

const NotLoggedInMainNav = props => {
    return (
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
                        <NavDropdown.Item href="/temas/enterate">Enterate Con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/lente">Al lente con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/trazos">Voz en trazos</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/colabora">Colabora Con Voz</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link href="/registrate">Registrate</Nav.Link>
                        <Nav.Link href="/login">Inicia Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

const LoggedInMainNav = props => {
    return (
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
                        <NavDropdown.Item href="/temas/enterate">Enterate Con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/lente">Al lente con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/trazos">Voz en trazos</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/colabora">Colabora Con Voz</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href={"/profile/"+props.user._id}>{props.user.name}</Nav.Link>
                        <Nav.Link href="/api/logout">Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

const MainNavPost = (props) => {
    if(props.user){
        return <MainNavLoggedInPost user={props.user} /> 
    }else{
        return <MainNavPostNotLoggedIn />
    }
};

const MainNavPostNotLoggedIn = () => {
    return(
        <>
            <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="/" className="bold"><img src="../assets/logo.jpg" className="logo-img"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/posts">Noticias</Nav.Link>
                    <Nav.Link href="/semana">Tema de la semana</Nav.Link>
                    <NavDropdown title="Secciones" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/temas/vozopina">Voz Opina</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/enterate">Enterate Con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/lente">Al lente con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/trazos">Voz en trazos</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/colabora">Colabora Con Voz</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link href="/registrate">Registrate</Nav.Link>
                        <Nav.Link href="/login">Inicia Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
};

const MainNavLoggedInPost = props => {
    return(
        <>
            <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="/" className="bold"><img src="../assets/logo.jpg" className="logo-img"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/posts">Noticias</Nav.Link>
                    <Nav.Link href="/semana">Tema de la semana</Nav.Link>
                    <NavDropdown title="Secciones" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/temas/vozopina">Voz Opina</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/enterate">Enterate Con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/lente">Al lente con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/trazos">Voz en trazos</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/colabora">Colabora Con Voz</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href={"/profile/"+props.user._id}>{props.user.name}</Nav.Link>
                        <Nav.Link href="/api/logout">Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

const LoggedInNav = props => {
    const [current, setCurrent] = useState("app")
    function handleClick(e){
        setCurrent(e.key)
        console.log(e.key)
    }
    return(
        <>
            <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="/" className="bold"><img src="../assets/logo.jpg" className="logo-img"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/posts">Noticias</Nav.Link>
                    <Nav.Link href="/semana">Tema de la semana</Nav.Link>
                    <NavDropdown title="Secciones" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/temas/vozopina">Voz Opina</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/enterate">Enterate Con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/lente">Al lente con Voz</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/trazos">Voz en trazos</NavDropdown.Item>
                        <NavDropdown.Item href="/temas/colabora">Colabora Con Voz</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    {/* {<Nav.Link href="#deets">Nosotros</Nav.Link>} */}
                    <Nav.Link href={"/profile/"+props.user._id}>{props.user.name}</Nav.Link>
                    <Nav.Link href="/api/logout">Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}


export {MainNav as Nav, MainNavPost as PostNav, LoggedInNav}