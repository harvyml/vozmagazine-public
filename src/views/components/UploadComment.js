import React, {useEffect, useState} from "react"
import {ReactDom} from "react-dom"
import MarkdownEditor from '@uiw/react-markdown-editor';
import {Button, Modal} from "react-bootstrap"
import axios from "axios";

const UploadComment = props => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error') == "true"
    const [err, setErr] = useState(error)
    const [value, setValue] = useState("")
    const [postId, setPostId] = useState("")

    useEffect(() => {
        setPostId(props.postId)
    }, [props.postId])

    /**
     * Updates markdown and sets its value to the textarea
     */
    function updateMarkdown(editor, data, value){
        setValue(value)
        console.log(editor, data)
    }    
    /**
     * send comment and show it in the post
     */
    function upload(){
        console.log("comment stuff: " + postId, value)
        axios.post("/api/comment", {
            postId,
            markdown: value
        }).then(() => {
            window.location.href = ""
        }).catch(err => {
            alert(err.message)
            window.location.href = window.location.href
        })
    }

    
    return(
        <>
        <div className="upload-comment">
            <div className="upload-comment-textarea textarea">
                <textarea className="hidden" value={value}></textarea>
                <MarkdownEditor onChange={updateMarkdown} value="Opina"/>
            </div>

            <Button variant="dark" className="lila-bg margined" onClick={upload}>Enviar</Button>
        </div>
        <ModalError show={err} handleClose={() => setErr(!err)} />
        </>
    )
};


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


export {UploadComment}