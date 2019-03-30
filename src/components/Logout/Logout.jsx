import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import Context from '../../services/Context'
class Logout extends Component {

    state = {
        redirect : false,
    }

    handleLogout(){

        let message

        if(localStorage.getItem("token")){
            localStorage.removeItem("token")
            message = 31
        }else{
            message = 32
        }

        this.setState({
            redirect : true,
        })

        this.context.setAlert(message, "danger")
    }

    componentDidMount(){
        this.handleLogout()
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