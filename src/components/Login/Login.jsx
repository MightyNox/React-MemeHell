import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'

import statusMessages from '../../config/Status'
import pattern from '../../config/Pattern';
class Login extends Component {
    
    state = {
        redirect : false,

        checkBox : false,

        alert:{
            display : false,
            props : false,
            message : null
        },
        login:{
            value : null,
            correct : false,
            message : null
        },
        password:{
            value : null,
            correct : false,
            message : null
        }
    }


    handleSubmitOnClick = async() =>{
        const login = this.state.login
        const password = this.state.password

        if(!login.correct || !password.correct){
            this.setState({
                alert:{
                    display : true,
                    props : alert.props,
                    message : 21
                }})

            return
        }

        const body = {
            login : login.value,
            password : password.value,
        }

        try{
            const user = await axios.post('/auth/login', qs.stringify(body))
            
            localStorage.setItem("user", user)

            this.setState({redirect : true})

        }catch(err){
            this.setState({
                alert:{
                    display : true,
                    props : false,
                    message : err.response.data.message
            }})
        }
    }


    handleLoginOnBlur = async (evt) =>{
        const login = evt.target.value

        if(login.length === 0){
            return
        }

        if(
            !pattern.nickname.exec(login) && 
            !pattern.email.exec(login)
            )
        {
            this.setState({
                login : {
                    value : null,
                    correct : false,
                    message : 50,
            }})

            return

        }

        this.setState({
            login : {
                value : login,
                correct : true,
                message : 49
        }})
    }


    handlePasswordOnBlur = async (evt) =>{
        const password = evt.target.value

        if(password.length === 0){
            return
        }
        
        if(!pattern.password.exec(password))
        {
            this.setState({
                password : {
                    value : null,
                    correct : false,
                    message : 62
            }})

            return
        }
         
        this.setState({
            password : {
                value : password,
                correct : true,
                message : 57
        }})
    }


    handleFormError(field){
        let message = field.message
        let returnValue = "form-control"

        if(message !== null){
            message = statusMessages[message][1]
            
            if(message === "danger"){
                returnValue += " is-invalid"
            }
            else if(message === "success"){
                returnValue += " is-valid"
            }
        }

        return returnValue
    }
    

    handleFormMessage(field){
        let message = field.message
        let returnValue = null

        if(message !== null){
            const statusMessage = statusMessages[message]

            returnValue = (
                <small className={"form-text text-"+statusMessage[1]+""}>
                    {statusMessage[0]}
                </small>
            )
        }

        return returnValue
    }


    displayAlert(){
        const alert = this.state.alert
        const propsAlert=this.props.location.alert

        let alertType="danger"
        let message="Oops! Something went wrong!"

        if(!alert.display && (!propsAlert || alert.props)){
            return
        }

        if(propsAlert){
            if(propsAlert.error === false){
                alertType="success"
            }
                
            message=propsAlert.message
        }

        return(
            <div className={"alert alert-"+alertType+" alert-dismissible"}>
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
        if(localStorage.getItem("user") !== null){
            return <Redirect to="/"/>
        }

        if(this.state.redirect){
            return <Redirect to="/"/>
        }

        return (
            <React.Fragment>
                {this.displayAlert()}
                <br/><br/><br/>
                <div className="row container-fluid">
                    <div className="col-2"/>

                    <div className="col-8">
                        <div className="row justify-content-center">
                                <h4>
                                    Login to your account
                                </h4>
                            </div>

                        <br/>
                    
                        <form>
                            {/* nickname or email */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Login:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="text" className={this.handleFormError(this.state.login)} onBlur={this.handleLoginOnBlur} placeholder="Mr. Example" />
                                    {this.handleFormMessage(this.state.login)}
                                </div>
                            </div>

                            {/* password */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Password:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="password" className={this.handleFormError(this.state.password)} onBlur={this.handlePasswordOnBlur} placeholder="password" />
                                    {this.handleFormMessage(this.state.password)}
                                </div>
                            </div>
                            
                            <br/>

                            {/* Submit button */}
                            <div className="row justify-content-center">
                                <button onClick={this.handleSubmitOnClick} type="button" className="btn btn-dark">Sign In</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-2"/>
                </div>
                
            </React.Fragment>
        )
    }
}

export default Login;