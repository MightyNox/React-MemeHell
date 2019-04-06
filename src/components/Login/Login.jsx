import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import qs from 'qs'

import pattern from '../../config/Pattern'
import Context from '../Context/Context'
import postData from '../../services/postData'
import formMessage from '../../services/formMessage'
import formError from '../../services/formError'
class Login extends Component {
    
    state = {
        redirect : false,

        checkBox : false,

        login:{
            value : null,
            correct : false,
            alert : {
                message : null,
                type : null
            }
        },
        password:{
            value : null,
            correct : false,
            alert : {
                message : null,
                type : null
            }
        },

        activationButton : null
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

        const response = await postData('/auth/login', qs.stringify(body))

        if (response.error) {
            if(response.error.message === 'This user\'s email isn\'t confirmed!'){
                await this.setState({activationButton : true})
            }

            this.context.setAlert(response.error.message, response.error.type)
        }else{
            await localStorage.setItem("token", response.data.token)
            await this.context.setSignedIn(true)
            await this.setState({redirect : true})
    
            this.context.setAlert(
                "You are signed in! Have fun 👻",
                "success"
            )
        }
    }


    sendEmail = async() => {
        const login = this.state.login

        if(!login.correct){
            
            this.context.setAlert(
                "You have to fill login!", 
                "danger"
            )
            return
        }

        const body = {
            login : login.value
        }

        const response = await postData('/auth/confirm-email', qs.stringify(body))

        if (response.error) {
            this.context.setAlert(response.error.message, response.error.type)
        }else{
    
            this.context.setAlert(
                "Email sent!",
                "success"
            )
        }
    }


    handleLoginOnBlur = async (evt) =>{
        const login = evt.target.value

        if(login.length === 0){
            this.setState({
                login : {
                    value : null,
                    correct : false,
                    alert : {
                        message : null,
                        type : null
                    }
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
                    alert : {
                        message : "Incorrect login!",
                        type : "danger"
                    }
                }
            })

            return

        }

        this.setState({
            login : {
                value : login,
                correct : true,
                alert : {
                    message : "Acceptable",
                    type : "success"
                }
        }})
    }


    handlePasswordOnBlur = async (evt) =>{
        const password = evt.target.value

        if(password.length === 0){
            this.setState({
                password : {
                    value : null,
                    correct : false,
                    alert : {
                        message : null,
                        type : null
                    }
            }})

            return
        }
        
        if(!pattern.password.exec(password))
        {
            this.setState({
                password : {
                    value : null,
                    correct : false,
                    alert : {
                        message : "Incorrect password!",
                        type : "danger"
                    }
            }})

            return
        }
         
        this.setState({
            password : {
                value : password,
                correct : true,
                alert : {
                    message : "Acceptable",
                    type : "success"
                }
        }})
    }


    render() {
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
                                    <input required={true} type="text" className={formError(this.state.login)} onBlur={this.handleLoginOnBlur} placeholder="Mr. Example" />
                                    {formMessage(this.state.login.alert)}
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
                                    <input required={true} type="password" className={formError(this.state.password)} onBlur={this.handlePasswordOnBlur} placeholder="password" />
                                    {formMessage(this.state.password.alert)}
                                </div>
                            </div>
                            
                            <br/>

                            {/* Submit button */}
                            <div className="row justify-content-center">
                                <button onClick={this.handleSubmitOnClick} type="button" className="btn btn-dark">Sign In</button>
                            </div>
                        </form>

                        <br/>

                        {this.displayActivationButton()}
                    </div>

                    <div className="col-2"/>
                </div>
                
            </React.Fragment>
        )
    }


    displayActivationButton() {
        if(this.state.activationButton){
            return(
                <div className="row justify-content-center">
                    <button onClick={this.sendEmail} type="button" className="btn btn-dark">
                        Confirm email &nbsp;
                        <i class="fas fa-envelope" />
                    </button>
                </div>
            )
        }
    }

    
    componentWillUnmount(){
        this.context.setAlert(null, null)
    }

    componentDidMount(){
        if(this.context.state.signedIn){
            this.setState({redirect : true})
        }
    }
}

Login.contextType = Context

export default Login;