import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'

class Register extends Component {
    state = {
        email : "",
        nickname : "",
        password : "",
        checkBox : "",
        redirect : false,
        showError : false,
    }


    handleSubmitOnClick = async() =>{
        const body = {
            email : this.state.email,
            nickname : this.state.nickname,
            password : this.state.password,
        }

        try{
            const res = await axios.post('/auth/register', qs.stringify(body))
            
            if(res.status !== 201){
                throw Error(res.statusText) 
            }
            
            this.setState({redirect : true})

        }catch(err){
            this.setState({showError : true})
        }
    }


    handleNicknameOnChange = (evt) =>{
         this.setState({nickname : evt.target.value}) 
    }


    handleEmailOnChange = (evt) =>{
        this.setState({email : evt.target.value}) 
    }


    handlePasswdOnChange = (evt) =>{
        this.setState({password : evt.target.value}) 
    }


    handleCheckBoxOnChange = (evt) =>{
        if(!this.state.checkBox){
            this.setState({checkBox : evt.target.value}) 
        }else{
            this.setState({checkBox : ""}) 
        }
    }


    enableButton(){
        if(this.state.email.length <= 6)
            return true
        if(this.state.password.length < 8)
            return true
        if(this.state.nickname.length < 3)
            return true
        if(!this.state.checkBox)
            return true

        return false
    }


    displayError(){
        if(!this.state.showError){
            return
        }

        return(
            <div className="alert alert-danger alert-dismissible">
                Oops! Something went wrong!
                <button type="button" onClick={this.handleErrorAlertOnClick} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }


    handleErrorAlertOnClick = ()=>{
        this.setState({showError : false})
    }


    render() {
        if(this.state.redirect){
            return <Redirect to="/"></Redirect>
        }

        return (
            <React.Fragment>
                {this.displayError()}
                <br/><br/><br/>
                <div className="row">
                    <div className="col-2"/>

                    <div className="col-8">
                        <form>
                            {/* nickname */}
                            <div className="row justify-content-center">
                                <div className="form-group  col-md-1">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Nickname:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="text" className="form-control" onChange={this.handleNicknameOnChange} placeholder="Mr. Example" />
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
                                    <input required={true} type="text" className="form-control" onChange={this.handleEmailOnChange} placeholder="simple@email.com" />
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
                                    <input required={true} type="password" className="form-control" onChange={this.handlePasswdOnChange} placeholder="password" />
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
                                <button disabled={this.enableButton()} onClick={this.handleSubmitOnClick} type="button" className="btn btn-dark">Submit</button>
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