import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import AlertContext from '../Alert/AlertContext'
class Logout extends Component {

    state = {
        rediret : false,
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
            rediret : true,
        })

        this.context.setAlert(message)
    }

    componentDidMount(){
        this.handleLogout()
    }

    render() {

        if(this.state.rediret){
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

Logout.contextType = AlertContext

export default Logout;