import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'

class Register extends Component {
    state = {
        redirect : false,

        checkBox : false,

        alert:{
            error : false,
            errorMessage : "",
        },
        nickname:{
            value : "",
            correct:null,
            errorMessage:""
        },
        email:{
            value : "",
            correct:null,
            errorMessage:""
        },
        password:{
            value : "",
            correct:null,
            errorMessage:""
        },
        confirmPassword : {
            correct:null,
            errorMessage:""
        }
    }


    handleSubmitOnClick = async() =>{
        const nickname = this.state.nickname
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword
        const checkBox = this.state.checkBox


        


        if(!nickname.correct || !email.correct || !password.correct || !confirmPassword.correct || !checkBox ){
            this.setState({
                alert:{
                    error : true,
                    errorMessage : "You have to fill all gaps correctly!"
                }})

            return
        }

        const body = {
            email : email.value,
            nickname : nickname.value,
            password : password.value,
        }

        try{
            await axios.post('/auth/register', qs.stringify(body))
        
            this.setState({redirect : true})

        }catch(err){
            this.setState({
                alert:{
                    error : true,
                    errorMessage : err.response.data.message
            }})
        }
    }


    handleNicknameOnBlur = async (evt) =>{
        const nickname = evt.target.value
        const nicknamePattern = /^[\w\d-]{3,}$/

        //Incorrect pattern
        if(!nicknamePattern.exec(nickname))
        {
            this.setState({
                nickname : {
                    value : "",
                    correct : false,
                    errorMessage : "Incorrect nickname! Min. 3 signs",
            }})

            return

        }

        //Taken 
        try{
            await axios.post('/auth/check-nickname', qs.stringify({nickname : nickname}))
        }catch(err){
            this.setState({
                nickname : {
                    value : "",
                    correct : false,
                    errorMessage : err.response.data.message,
            }})

            return
        }
        
        //Correct
        this.setState({
            nickname : {
                value : nickname,
                correct : true,
                errorMessage : "",
        }})
    }


    handleEmailOnBlur = async (evt) =>{
        const email = evt.target.value
        const emailPattern = /^[\w-]+@[\w-]+(\.[a-zA-Z]{2,3}){1,2}$/

        //Incorrect pattern
        if(!emailPattern.exec(email))
        {
            this.setState({
                email : {
                    value : "",
                    correct : false,
                    errorMessage : "Incorrect email!",
            }})

            return

        }

        //Taken 
        try{
            await axios.post('/auth/check-email', qs.stringify({email : email}))
        }catch(err){
            this.setState({
                email : {
                    value : "",
                    correct : false,
                    errorMessage : err.response.data.message,
            }})

            return
        }
        
        //Correct
        this.setState({
            email : {
                value : email,
                correct : true,
                errorMessage : "",
        }})
    }


    handlePasswordOnBlur = async (evt) =>{
        const password = evt.target.value
        const passwordPattern = /^.{8,}$/

        //Incorrect pattern
        if(!passwordPattern.exec(password))
        {
            this.setState({
                password : {
                    value : "",
                    correct : false,
                    errorMessage : "Password is too weak! Min. 8 signs",
            }})

            return
        }


        //Correct
        this.setState({
            password : {
                value : password,
                correct : true,
                errorMessage : "",
        }})
    }


    handleConfirmPasswordOnBlur = async (evt) =>{
        const password = this.state.password.value
        const confirmPassword = evt.target.value

        //Different passwords
        if(password.length === 0 || password !== confirmPassword)
        {
            this.setState({
                confirmPassword : {
                    correct : false,
                    errorMessage : "Passwords have to match!",
            }})

            return
        }

        //Correct
        this.setState({
            confirmPassword : {
                correct : true,
                errorMessage : "",
        }})
    }


    handleNicknameError(){
        const correct = this.state.nickname.correct
        let returnValue = "form-control"

        if(correct === false){
            returnValue += " is-invalid"
        }
        else if(correct === true){
            returnValue += " is-valid"
        }

        return returnValue
    }


    handleEmailError(){
        const correct = this.state.email.correct
        let returnValue = "form-control"

        if(correct === false){
            returnValue += " is-invalid"
        }
        else if(correct === true){
            returnValue += " is-valid"
        }

        return returnValue
    }


    handlePasswordError(){
        const correct = this.state.password.correct
        let returnValue = "form-control"

        if(correct === false){
            returnValue += " is-invalid"
        }
        else if(correct === true){
            returnValue += " is-valid"
        }

        return returnValue
    }


    handleConfirmPasswordError(){
        const correct = this.state.confirmPassword.correct
        let returnValue = "form-control"

        if(correct === false){
            returnValue += " is-invalid"
        }
        else if(correct === true){
            returnValue += " is-valid"
        }

        return returnValue
    }


    handleCheckBoxOnChange = () =>{
        const checkbox = this.state.checkBox

        if(!checkbox){
            this.setState({checkBox : true}) 
        }else{
            this.setState({checkBox : false}) 
        }
    }


    displayAlert(){
        if(!this.state.alert.error){
            return
        }

        return(
            <div className="alert alert-danger alert-dismissible">
                {this.state.alert.errorMessage ? this.state.alert.errorMessage : 'Oops! Something went wrong!'}
                <button type="button" onClick={this.handleAlertOnClick} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }


    handleAlertOnClick = ()=>{
        this.setState({
            alert:{
                error : false,
                errorMessage : "",
        }})
    }
    


    render() {
        if(this.state.redirect){
            return <Redirect to="/login"></Redirect>
        }

        return (
            <React.Fragment>
                {this.displayAlert()}
                <br/><br/><br/>
                <div className="row">
                    <div className="col-2"/>

                    <div className="col-8">
                        <form>
                            {/* nickname */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Nickname:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="text" className={this.handleNicknameError()} onBlur={this.handleNicknameOnBlur} placeholder="Mr. Example" />
                                    <small className="form-text text-danger">
                                        {this.state.nickname.errorMessage}
                                    </small>
                                </div>
                            </div>

                            {/* email */}
                            <div className="row justify-content-center">
                                <div className="form-group  col-md-1">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Email:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="text" className={this.handleEmailError()} onBlur={this.handleEmailOnBlur} placeholder="simple@email.com" />
                                    <small className="form-text text-danger">
                                        {this.state.email.errorMessage}
                                    </small>
                                </div>
                            </div>

                            {/* password */}
                            <div className="row justify-content-center">
                                <div className="form-group  col-md-1">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Password:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="password" className={this.handlePasswordError()} onBlur={this.handlePasswordOnBlur} placeholder="password" />
                                    <small className="form-text text-danger">
                                        {this.state.password.errorMessage}
                                    </small>
                                </div>
                            </div>

                            {/* confirm password */}
                            <div className="row justify-content-center">
                                <div className="form-group  col-md-1">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Confirm:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="password" className={this.handleConfirmPasswordError()} onBlur={this.handleConfirmPasswordOnBlur} placeholder="password" />
                                    <small className="form-text text-danger">
                                        {this.state.confirmPassword.errorMessage}
                                    </small>
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
                                <button onClick={this.handleSubmitOnClick} type="button" className="btn btn-dark">Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-4"/>
                </div>
                
            </React.Fragment>
        )
    }
}

export default Register;