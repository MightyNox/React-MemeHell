import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

class Register extends Component {
    state = {
        email : "",
        nickname : "",
        password : "",
        checkBox : ""
    }


    handleSubmitOnClick = async () =>{
        const body = {
            email : this.state.email,
            nickname : this.state.nickname,
            password : this.state.password,
        }

        axios.post('/auth/register', qs.stringify(body))
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
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


    render() {
        return (
            <React.Fragment>
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
                            <Link to="/">
                                <button disabled={this.enableButton()} onClick={this.handleSubmitOnClick} type="submit" className="btn btn-dark">Submit</button>
                            </Link>
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