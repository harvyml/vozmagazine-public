import React, {Component, useState, useEffect} from "react"
import ReactDOM from "react-dom";


const Video = (props) => {
    const [media, setMedia] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        setMedia(props.src)
        setUrl(videoUrlConverter(media))
    }, [])
    function videoUrlConverter(url){
        let new_url = props.src.replace("https://youtu.be/", "https://www.youtube.com/embed/")
        console.log(url, new_url, props.src)
        return new_url
    }
    return (
        <iframe src={url} frameborder="0" className={props.className} allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowFullScreen></iframe>
    )
}


    

export default Video