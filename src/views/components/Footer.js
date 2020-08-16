import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Card, Button} from "react-bootstrap"
const Footer = () => {
    return(
        <footer className="footer">
            <Card className="main-bg no-border-radious paddinged" variant="dark">
                <Card.Body>
                    <Card.Title className="white">Nos encantaria leerte</Card.Title>
                    <Card.Text className="white">
                    Escribenos a <a href="mailto:vozmagazine@gmail.com">vozmagazineco@gmail.com</a> y te responderemos lo antes posible.
                    </Card.Text>
                    <Button variant="dark" className="social-btn" href="https://www.instagram.com/vozmagazineco/"><img src="./assets/instagram.png"/>instagram</Button>
                    <Button variant="dark" className="social-btn" href="https://www.facebook.com/Voz-Magazine-103485384748284"><img src="./assets/facebook.png"/>Facebook</Button>
                    <Button variant="dark" className="social-btn" href="tel:+573103618530"><img src="./assets/whatsapp.png"/>WhatsApp</Button>
                </Card.Body>
            </Card>
            <div className="copyright-container main-bg no-border-radious center">
                <div className="copyright lila">
                    <i className="material-icons">copyright</i><span className="grey-text center top-aligned">vozmagazine</span>
                </div>
            </div>
        </footer>
    )
};

const FooterInner = () => {
    return(
        <footer className="footer">
            <Card className="main-bg no-border-radious paddinged" variant="dark">
                <Card.Body>
                    <Card.Title className="white">Nos encantaria leerte</Card.Title>
                    <Card.Text className="white">
                    Escribenos a <a href="mailto:vozmagazine@gmail.com">vozmagazineco@gmail.com</a> y te responderemos lo antes posible.
                    </Card.Text>
                    <Button variant="dark" className="social-btn" href="https://www.instagram.com/vozmagazineco/"><img src="../assets/instagram.png"/>instagram</Button>
                    <Button variant="dark" className="social-btn" href="https://www.facebook.com/Voz-Magazine-103485384748284"><img src="../assets/facebook.png"/>Facebook</Button>
                    <Button variant="dark" className="social-btn" href="tel:+573103618530"><img src="../assets/whatsapp.png"/>WhatsApp</Button>
                </Card.Body>
            </Card>
            <div className="copyright-container main-bg no-border-radious paddinged center">
                <div className="copyright">
                    <span className="grey-text"><i className="material-icons">copyright</i>vozmagazine</span>
                </div>
            </div>
        </footer>
    )
};

export {Footer, FooterInner}