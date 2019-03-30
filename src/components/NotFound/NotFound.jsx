import React, { Component } from 'react'
import image from '../../images/NotFound.jpg'
import './NotFound.css'

class NotFound extends Component {
    render() {
        return (
            <img src={image} className="not-found-img" alt="404 Not Found"/>
        )
    }
}

export default NotFound



