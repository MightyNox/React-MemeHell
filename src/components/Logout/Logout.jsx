import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import Context from '../Context/Context'
class Logout extends Component {

    state = {
        redirect : false,
    }

    handleLogout = async() => {

        let message = "You are not signed in!"
        let type = "danger"

        if(this.context.state.signedIn) {
            await localStorage.removeItem("token")
            await this.context.setSignedIn(false)

            message = "You are signed out!"
            type = "success"
        }
        
        await this.setState({
            redirect : true,
        })

        this.context.setAlert(message, type)
    }

    componentDidMount = async() => {
        await this.handleLogout()
    }

    render() {

        if(this.state.redirect){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/login"
                    }}/>
               </React.Fragment>
           )
        }
        
        return null
    }
}

Logout.contextType = Context

export default Logout;