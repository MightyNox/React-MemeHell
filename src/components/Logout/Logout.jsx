import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {

    state = {
        rediret : false,
        message : "",
        error : ""
    }

    handleLogout(){

        let message
        let error

        if(localStorage.getItem("user")){
            localStorage.removeItem("user")
            message = "You are logged out!"
            error = false
        }else{
            message = "You are not signed in!"
            error = true
        }

        this.setState({
            rediret : true,
            message : message,
            error : error
        })
    }

    render() {

        if(this.state.rediret){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/login",
                       alert: {
                            error : this.state.error,
                            message : this.state.message
                        }
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

export default Logout;