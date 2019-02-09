import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'

class Login extends Component {
    state = {
        rediret : false,
        alert : {
            display: false,
            message : ""
        }
    }

    handleLogout = async() => {
        try{
            await axios.post('/auth/logout')
        
            this.setState({
                rediret : true,
                alert : {
                    display : false,
                    message : "You are logged out!"
                }
            })

        }catch(err){
            this.setState({
                rediret : false,
                alert : {
                    display : true,
                    message : err.response.data.message
                }
            })
        }
    }


    displayAlert(){
        const alert = this.state.alert

        const message="Oops! Something went wrong!"

        if(!alert.display ){
            return
        }

        return(
            <div className={"alert alert-danger alert-dismissible"}>
                {alert.message ? alert.message : message}
                <button type="button" onClick={this.handleAlertOnClick} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }


    handleAlertOnClick = ()=>{
        this.setState({
            alert:{
                display : false,
                props : true,
                message : "",
        }})
    }


    render() {
        if(this.state.rediret){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/login",
                       alert: this.state.alert.message
                   }}/>
               </React.Fragment>
           )
        }
        
        return (
            <React.Fragment>
                {this.displayAlert()}
                <br/><br/><br/>
                <div className="row container-fluid">
                    <div className="col-2"/>

                    <div className="col-8">
                        {/* Submit button */}
                         <div className="row justify-content-center">
                            <button onClick={this.handleLogout} type="button" className="btn btn-dark">Logout</button>
                        </div>
                    </div>

                    <div className="col-2"/>
                </div>
                
            </React.Fragment>
        )
    }
}

export default Login;