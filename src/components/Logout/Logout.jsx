import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'

class Login extends Component {
    state = {
        rediret : false,
        alert : {
            error: true,
            message : ""
        }
    }

    handleLogout(){
        axios.post('/auth/logout')
        .then( res => {
            this.setState({
                rediret : true,
                alert : {
                    error : false,
                    message : "You are logged out!"
                }
            })
        })
        .catch(err => {
            this.setState({
                rediret : true,
                alert : {
                    error : true,
                    message : err.response.data.message
                }
            })
        })
    }


    render() {

        if(this.state.rediret){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/login",
                       alert: this.state.alert
                    }}/>
               </React.Fragment>
           )
        }
        
        return (
            <React.Fragment>
                {this.handleLogout()}
            </React.Fragment>
        )
    }
}

export default Login;