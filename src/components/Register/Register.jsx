import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'

import statusMessages from '../../config/Status'
import pattern from '../../config/Pattern'
import Context from '../Context/Context'
import './Register.css'

class Register extends Component {
    
    state = {

        redirect : false,

        nickname:{
            value : null,
            correct : false,
            message : null
        },

        email:{
            value : null,
            correct : false,
            message : null
        },

        password:{
            value : null,
            correct : false,
            message : null
        },

        confirmPassword : {
            value : null,
            correct : false,
            message : null
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

        try{
            await axios.post('/auth/register', qs.stringify(body))
        
            this.setState({
                redirect : true
            })

            this.context.setAlert(
                "User successfully created! Now you can sign in 😈", 
                "success"
            )

        }catch(err){
            
            const status = err.response.status
            if(status === 400){
                this.context.setAlert(
                    "You have to fill all gaps correctly!", 
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


    handleNicknameOnBlur = async (evt) =>{
        const nickname = evt.target.value

        if(nickname.length === 0){
            this.setState({
                nickname : {
                    value : null,
                    correct : false,
                    message : null
            }})
            
            return
        }

        if(!pattern.nickname.exec(nickname))
        {
            this.setState({
                nickname : {
                    value : null,
                    correct : false,
                    message : 53
            }})

            return
        }

        try{
            await axios.post('/auth/check-nickname', qs.stringify({nickname : nickname}))

            this.setState({
                nickname : {
                    value : nickname,
                    correct : true,
                    message : 51
            }})

        }catch(err){
            this.setState({
                nickname : {
                    value : null,
                    correct : false,
                    message : 52
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
                    message : null
            }})

            return
        }

        if(!pattern.email.exec(email))
        {
            this.setState({
                email : {
                    value : null,
                    correct : false,
                    message : 56
            }})

            return
        }

        try{
            await axios.post('/auth/check-email', qs.stringify({email : email}))

            this.setState({
                email : {
                    value : email,
                    correct : true,
                    message : 54
            }})

        }catch(err){
            this.setState({
                email : {
                    value : null,
                    correct : false,
                    message : 55
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
                    message : null
            }})

            return
        }


        if(!pattern.password.exec(password))
        {
            if(confirmPassword){
                this.setState({
                    confirmPassword : {
                        correct : false,
                        message : 60
                }})
            }

            this.setState({
                password : {
                    value : null,
                    correct : false,
                    message : 58
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


    handleConfirmPasswordOnBlur = async (evt) =>{
        const confirmPassword = evt.target.value
        const password = this.state.password.value

        if(confirmPassword.length === 0){
            this.setState({
                confirmPassword : {
                    value : null,
                    correct : false,
                    message : null
            }})

            return
        }

        if(!password){
            this.setState({
                confirmPassword : {
                    value : null,
                    correct : false,
                    message : 61
            }})

            return
        }

        if(password !== confirmPassword)
        {
            this.setState({
                confirmPassword : {
                    value : null,
                    correct : false,
                    message : 60
            }})

            return
        }

        this.setState({
            confirmPassword : {
                value : confirmPassword,
                correct : true,
                message : 59
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
                                    <input required={true} type="text" className={this.handleFormError(this.state.nickname)} onBlur={this.handleNicknameOnBlur} placeholder="Mr. Example" />
                                    {this.handleFormMessage(this.state.nickname)}
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
                                    <input required={true} type="text" className={this.handleFormError(this.state.email)} onBlur={this.handleEmailOnBlur} placeholder="simple@email.com" />
                                    {this.handleFormMessage(this.state.email)}
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

                            {/* confirm password */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Confirm:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="password" className={this.handleFormError(this.state.confirmPassword)} onBlur={this.handleConfirmPasswordOnBlur} placeholder="password" />
                                    {this.handleFormMessage(this.state.confirmPassword)}
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

Register.contextType = Context

export default Register;