import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import statusMessages from '../../config/Status'
import pattern from '../../config/Pattern'
import Context from '../../services/Context'
class Login extends Component {
    
    state = {
        redirect : false,

        checkBox : false,

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
            
            this.context.setAlert(
                "You have to fill all gaps correctly!", 
                "danger"
            )
            return
        }

        const body = {
            login : login.value,
            password : password.value,
        }

        try{
            const response = await axios.post('/auth/login', qs.stringify(body))

            localStorage.setItem("token", response.data.token)

            this.setState({redirect : true})
            this.context.setAlert(
                "You are signed in! Have fun 👻",
                "success"
            )

        }catch(err){

            const status = err.response.status
            if(status === 400){
                this.context.setAlert(
                    "Incorrect login or password!", 
                    "danger"
                )
            }else if(status === 500){
                this.context.setAlert(
                    "Oops! Something went wrong! 👿", 
                    "danger"
                )
            }else{
                this.context.setAlert(
                    "Oops! Something went wrong! 👿", 
                    "danger"
                )
            }
        }
    }


    handleLoginOnBlur = async (evt) =>{
        const login = evt.target.value

        if(login.length === 0){
            this.setState({
                login : {
                    value : null,
                    correct : false,
                    message : null
            }})

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
            this.setState({
                password : {
                    value : null,
                    correct : false,
                    message : null
            }})

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


    render() {
        if(localStorage.getItem("token") !== null){
            return <Redirect to="/"/>
        }

        if(this.state.redirect){
            return <Redirect to="/"/>
        }

        return (
            <React.Fragment>
                <div className="space row container-fluid">
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

    
    componentWillUnmount(){
        if(this.context.state.alert !== null){
            this.context.setAlert(null, null)
        }
    }
}

Login.contextType = Context

export default Login;