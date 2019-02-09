import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'

class Login extends Component {
    
    state = {
        redirect : false,

        checkBox : false,

        alert:{
            display : false,
            props : false,
            message : "",
        },
        login:{
            value : "",
            correct:null,
            errorMessage:""
        },
        password:{
            value : "",
            correct:null,
            errorMessage:""
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
                    message : "You have to fill all gaps correctly!"
                }})

            return
        }

        const body = {
            login : login.value,
            password : password.value,
        }

        try{
            await axios.post('/auth/login', qs.stringify(body))
        
            this.setState({redirect : true})

        }catch(err){
            this.setState({
                alert:{
                    display : true,
                    props : alert.props,
                    message : err.response.data.message
            }})
        }
    }


    handleLoginOnBlur = async (evt) =>{
        const login = evt.target.value
        const nicknamePattern = /^[\w\d-]{3,}$/
        const emailPattern = /^[\w-]+@[\w-]+(\.[a-zA-Z]{2,3}){1,2}$/

        //Incorrect pattern
        if(!nicknamePattern.exec(login) && !emailPattern.exec(login))
        {
            this.setState({
                login : {
                    value : "",
                    correct : false,
                    errorMessage : "Wrong login!",
            }})

            return

        }

        //Correct
        this.setState({
            login : {
                value : login,
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
                    errorMessage : "Wrong password!",
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


    handleLoginError(){
        const correct = this.state.login.correct
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


    displayAlert(){
        const alert = this.state.alert
        const propsAlert=this.props.location.alert

        let alertType="danger"
        let message="Oops! Something went wrong!"

        if(!alert.display && (!propsAlert || alert.props)){
            return
        }

        if(propsAlert){
            alertType="success"
            message=propsAlert
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
                                    <input required={true} type="text" className={this.handleLoginError()} onBlur={this.handleLoginOnBlur} placeholder="Mr. Example" />
                                    <small className="form-text text-danger">
                                        {this.state.login.errorMessage}
                                    </small>
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
                                    <input required={true} type="password" className={this.handlePasswordError()} onBlur={this.handlePasswordOnBlur} placeholder="password" />
                                    <small className="form-text text-danger">
                                        {this.state.password.errorMessage}
                                    </small>
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