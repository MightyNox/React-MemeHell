import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'

import pattern from '../../config/Pattern'
import statusMessages from '../../config/Status'
import Alert from '../Alert/Alert'
import AlertContext from '../Alert/AlertContext'
import './AddMeme.css'

class AddMeme extends Component {

    state = {
        buttonEnabled : true,

        file : null,

        homeRedirect : false,
        loginRedirect : false,

        title:{
            value : null,
            correct : false,
            message : null
        },

        tags : null
    }

    fileUpload = async() => {
        const title = this.state.title
        const file = this.state.file
        const elements = document.getElementById("tagSelect")
        let tags = []
        Array.from(elements).forEach(function (element) {
            if(element.selected){
                tags.push(element.value)
            }
        })

        if(
            tags.length === 0 || 
            !title.correct || 
            !file
            ){
            this.context.setAlert(21)
            return
        }

        const data = new FormData()
        data.append("token", localStorage.getItem("token"))
        data.append("title", title.value)
        data.append("tags", tags)
        data.append("file", file)

        this.setState({buttonEnabled : false})
        
        try{

            await axios.post('/meme/add', data)

            this.setState({
                homeRedirect : true
            })
            this.context.setAlert(65)

        }catch(err){
            this.setState({buttonEnabled : true})

            const status = err.response.status
            if(status === 400){
                this.context.setAlert(21)
            }else if(status === 500){
                this.context.setAlert(0)
            }else{
                this.context.setAlert(0)
            }
        }
    }


    displayUploadButton(){
        if(this.state.buttonEnabled)
        {
            return(
                <button onClick={this.fileUpload} type="button" className="btn btn-dark">Upload</button>
            )

        }else{
            return(
                <button onClick={this.fileUpload} type="button" className="btn btn-dark" disabled>Upload</button>
            )
        }
        
    }


    displayFileName(){
        if(this.state.file)
        {
            return(
                <div>
                    File name: {this.state.file.name}
                </div>
            )

        }else{

        }
        
    }


    fileSelect = (event) => {
        this.setState({ 
            file : event.target.files[0] 
        })
    }


    handleTitleOnBlur = async (evt) =>{
        const title = evt.target.value

        if(title.length === 0){
            this.setState({
                title : {
                    value : null,
                    correct : false,
                    message : null
            }})

            return
        }

        if(!pattern.title.exec(title))
        {
            this.setState({
                title : {
                    value : null,
                    correct : false,
                    message : 64,
            }})

            return

        }

        this.setState({
            title : {
                value : title,
                correct : true,
                message : 49
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


    displaySelect = () => {
        if(!this.state.tags){
            return <p>There are no tags!</p>
        }else{
            return(
                <div>
                    <select id="tagSelect" multiple className="form-control">
                        {this.state.tags.map((tag) => 
                            <option key={tag.name} value={tag.name}>{tag.name}</option>
                        )} 
                    </select>
                </div>
            )
        }
    }


    getTags = async() => {

        try{
            const response = await axios.get('/tag/')
            this.setState({tags : response.data.tags})

        }catch(err){

            const status = err.response.status

            if(status === 500){
                this.context.setAlert(0)
            }else{
                this.context.setAlert(0)
            }
        }
    }


    handleNotLogged(){
        if(!localStorage.getItem("token")){
            const message = 32

            this.setState({
                loginRedirect : true,
            })

            this.context.setAlert(message)
        }
    }


    componentDidMount(){
        this.handleNotLogged()
        this.getTags()
    }
    
    render() {

        if(this.state.loginRedirect){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/login"
                    }}/>
               </React.Fragment>
            )
        }

        if(this.state.homeRedirect){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/"
                    }}/>
               </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                
                <Alert/>

                <br/>
                <br/>
                <br/>

                <div className="row container-fluid">
                    <div className="col-2"/>

                    <div className="col-8">
                        <div className="row justify-content-center">
                                <h4>
                                    Add Meme
                                </h4>
                            </div>

                        <br/>
                    
                        <form>
                            {/* Title */}
                            <div className="row justify-content-center">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label">
                                        <span className="text-danger font-weight-bold">*</span>
                                        Title:
                                    </label>
                                </div>
                                <div className="form-group col-md-3">
                                    <input required={true} type="text" className={this.handleFormError(this.state.title)} onBlur={this.handleTitleOnBlur} placeholder="Lana drahrepus" />
                                    {this.handleFormMessage(this.state.title)}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="row justify-content-center">
                                <span className="text-danger font-weight-bold">*</span>
                                <label>Select corresponding tags</label>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-3 col-sm-4 col-lg-5"/>
                                <div className="col-6 col-sm-4 col-lg-2">
                                    {this.displaySelect()}
                                </div>
                                <div className="col-3 col-sm-4 col-lg-5"/>
                            </div>

                            <br/>

                            {/* File */}
                            <div className="row justify-content-center">
                                <label className="btn btn-dark">
                                <input type="file" id="file" className="inputfile" onChange={this.fileSelect} />
                                    Choose Your Meme 
                                    <span role="img" aria-label="devil"> 😈</span>
                                </label>
                                {this.displayFileName()}
                            </div>
                            
                            
                            <br/>

                            {/* Submit button */}
                            <div className="row justify-content-center">
                                {this.displayUploadButton()}
                            </div>
                        </form>
                    </div>

                    <div className="col-2"/>
                </div>
                
            </React.Fragment>
        )
    }
}

AddMeme.contextType = AlertContext

export default AddMeme