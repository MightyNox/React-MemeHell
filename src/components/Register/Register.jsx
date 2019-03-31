import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import qs from 'qs'

import pattern from '../../config/Pattern'
import Context from '../Context/Context'
import postData from '../../services/postData'
import formMessage from '../../services/formMessage'
import formError from '../../services/formError'
import './Register.css'

class Register extends Component {
    
    state = {

        redirect : false,

        nickname:{
            value : null,
            correct : false,
            alert : {
                message : null,
                type : null
            }
        },

        email:{
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

        confirmPassword : {
            value : null,
            correct : false,
            alert : {
                message : null,
                type : null
            }
        },

        checkBox : false,
    }


    handleSubmitOnClick = async() =>{
        const nickname = this.state.nickname
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword
        const checkBox = this.state.checkBox

        if(
            !nickname.correct || 
            !email.correct || 
            !password.correct || 
            !confirmPassword.correct || 
            !checkBox 
            ){

            this.context.setAlert(
                "You have to fill all gaps correctly!", 
                "danger"
            )
            return
        }

        const body = {
            email : email.value,
            nickname : nickname.value,
            password : password.value,
        }

        const response = await postData('/auth/register', qs.stringify(body))

        if (response.error) {
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            this.setState({
                redirect : true
            })

            this.context.setAlert(
                "User successfully created! Now you can sign in 😈", 
                "success"
            )
        }
    }


    handleNicknameOnBlur = async (evt) =>{
        const nickname = evt.target.value

        if(nickname.length === 0){
            this.setState({
                nickname : {
                    value : null,
                    correct : false,
                    alert : {
                        message : null,
                        type : null
                    }
            }})
            
            return
        }

        if(!pattern.nickname.exec(nickname))
        {
            this.setState({
                nickname : {
                    value : null,
                    correct : false,
                    alert : {
                        message : "Incorrect nickname! Min. 3 signs",
                        type : "danger"
                    }
            }})

            return
        }

            const response = await postData('/auth/check-nickname', qs.stringify({nickname : nickname}))

            if(response.error){
                await this.setState({
                    nickname : {
                        value : null,
                        correct : false,
                        alert : {
                            message : response.error.message,
                            type : response.error.type
                        }
                }})
            }else{
                await this.setState({
                    nickname : {
                        value : nickname,
                        correct : true,
                        alert : {
                            message : "This nickname is free!",
                            type : "success"
                        }
                }})
            }
    }


    handleEmailOnBlur = async (evt) =>{
        const email = evt.target.value

        if(email.length === 0){
            this.setState({
                email : {
                    value : null,
                    correct : false,
                    alert : {
                        message : null,
                        type : null
                    }
            }})

            return
        }

        if(!pattern.email.exec(email))
        {
            this.setState({
                email : {
                    value : null,
                    correct : false,
                    alert : {
                        message : "Incorrect email!",
                        type : "danger"
                    }
            }})

            return
        }

        const response = await postData('/auth/check-email', qs.stringify({email : email}))

        if(response.error){
            await this.setState({
                nickname : {
                    email : null,
                    correct : false,
                    alert : {
                        message : response.error.message,
                        type : response.error.type
                    }
            }})
        }else{
            await this.setState({
                email : {
                    value : email,
                    correct : true,
                    alert : {
                        message : "This email is free!",
                        type : "success"
                    }
            }})
        }

    }


    handlePasswordOnBlur = async (evt) =>{
        const password = evt.target.value
        const confirmPassword = this.state.confirmPassword.value

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
            if(confirmPassword){
                this.setState({
                    confirmPassword : {
                        correct : false,
                        alert : {
                            message : "Passwords have to match!",
                            type : "danger"
                        }
                }})
            }

            this.setState({
                password : {
                    value : null,
                    correct : false,
                    alert : {
                        message : "Password is too weak! Min. 8 signs",
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


    handleConfirmPasswordOnBlur = async (evt) =>{
        const confirmPassword = evt.target.value
        const password = this.state.password.value

        if(confirmPassword.length === 0){
            this.setState({
                confirmPassword : {
                    value : null,
                    correct : false,
                    alert : {
                        message : null,
                        type : null
                    }
            }})

            return
        }

        if(!password){
            this.setState({
                confirmPassword : {
                    value : null,
                    correct : false,
                    alert : {
                        message : "First you have to set password!",
                        type : "danger"
                    }
            }})

            return
        }

        if(password !== confirmPassword)
        {
            this.setState({
                confirmPassword : {
                    value : null,
                    correct : false,
                    alert : {
                        message : "Passwords have to match!",
                        type : "danger"
                    }
            }})

            return
        }

        this.setState({
            confirmPassword : {
                value : confirmPassword,
                correct : true,
                alert : {
                    message : "Matches",
                    type : "success"
                }
        }})
    }


    handleCheckBoxOnChange = () =>{
        const checkbox = this.state.checkBox

        if(!checkbox){
            this.setState({checkBox : true}) 
        }else{
            this.setState({checkBox : false}) 
        }
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

        return (
            <React.Fragment>
                <div className="space row container-fluid">
                    <div className="col-2"/>

                    <div className="col-8">
                        <div className="row justify-content-center">
                            <h4>
                                Create new user
                            </h4>
                        </div>

                        <br/>

                        <form>
                            {/* nickname */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Nickname:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="text" className={formError(this.state.nickname.alert)} onBlur={this.handleNicknameOnBlur} placeholder="Mr. Example" />
                                    {formMessage(this.state.nickname.alert)}
                                </div>
                            </div>

                            {/* email */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Email:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="text" className={formError(this.state.email.alert)} onBlur={this.handleEmailOnBlur} placeholder="simple@email.com" />
                                    {formMessage(this.state.email.alert)}
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
                                    <input required={true} type="password" className={formError(this.state.password.alert)} onBlur={this.handlePasswordOnBlur} placeholder="password" />
                                    {formMessage(this.state.password.alert)}
                                </div>
                            </div>

                            {/* confirm password */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Confirm:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="password" className={formError(this.state.confirmPassword.alert)} onBlur={this.handleConfirmPasswordOnBlur} placeholder="password" />
                                    {formMessage(this.state.confirmPassword.alert)}
                                </div>
                            </div>

                            <br/>

                            {/* check box */}
                            <div className="row justify-content-center">
                                <div className="form-check">
                                    <input required={true} onChange={this.handleCheckBoxOnChange} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Accept the regulations!
                                    </label>
                                 </div>
                            </div>
                            
                            <br/>

                            {/* Submit button */}
                            <div className="row justify-content-center">
                                <button onClick={this.handleSubmitOnClick} type="button" className="btn btn-dark">Sign Up</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-2"/>
                </div>
            </React.Fragment>
        )
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

Register.contextType = Context

export default Register;