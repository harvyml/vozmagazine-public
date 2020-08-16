import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import {Navbar, NavDropdown, Nav, Carousel, Form, Col, Row, Button} from "react-bootstrap"
import MarkdownEditor from '@uiw/react-markdown-editor';
import axios from "axios"


const PostEditFormat = props => {
    const [markdown, setMarkdown] = useState("")
    const [isVideo, setIsVideo] = useState(false)
    useEffect(() => {
        console.log(markdown)
    }, [markdown])

    function updateMarkdown(editor, data, value){
        setMarkdown(value)
        console.log(editor, data)
    }

    function setVideoCheckbox(e){
        isVideo ? setIsVideo(false) : setIsVideo(true)
        console.log(e.target.value)
    }
    return (
        <>
            <Form action={props.action} method={props.method}>
                <Form.Control placeholder="Titulo" name="title"/>
                {/** the next tag sends true or false to the server depending on whether the user sets the media as a video or as an image */}
                <Form.Check label="¿Es un video?" onChange={setVideoCheckbox} name="hasvideo" value={isVideo}/>
                <Form.Control placeholder="URL del contenido multimedia principal (Imagen o video)" name="media"/>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows="3" placeholder="Descripción de lo mas aproximado posible a 180 caracteres" maxLength="180" name="description"/>
                </Form.Group>
                <Form.Control placeholder="Etiquetas (Deben estar separadas por comas)" name="tags"/>
                <Form.Control placeholder="Ciudad" name="city"/>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Categororia</Form.Label>
                    <Form.Control as="select" custom name="category">
                        <option value="vozopina">Voz Opina</option>
                        <option value="enterate">Enterate con Voz</option>
                        <option value="lente">Al lente de Voz</option>
                        <option value="trazos">Voz en trazos</option>
                        <option value="colabora">Colabora con Voz</option>
                    </Form.Control>
                </Form.Group>
                <textarea type="text" value={markdown} className="hidden" name="markdown"/>
                <MarkdownEditor
                    value="something"
                    onChange={updateMarkdown}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}


  export {PostEditFormat}