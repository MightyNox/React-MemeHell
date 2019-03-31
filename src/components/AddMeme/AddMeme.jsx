import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

import pattern from '../../config/Pattern'
import Context from '../Context/Context'
import postData from '../../services/postData'
import getData from '../../services/getData'
import formMessage from '../../services/formMessage'
import formError from '../../services/formError'
import './AddMeme.css'

class AddMeme extends Component {

    state = {
        buttonEnabled : true,

        file : null,

        homeRedirect : false,

        title:{
            value : null,
            correct : false,
            alert : {
                message : null,
                type : null
            }
        },

        tags : null
    }

    fileUpload = async() => {
        const title = this.state.title
        const file = this.state.file
        const tags = this.listTags()

        if(
            tags.length === 0 || 
            !title.correct || 
            !file
            ){
            this.context.setAlert(
                "You have to fill all gaps correctly!", 
                "danger"
            )
            return
        }

        const data = new FormData()
        data.append("token", localStorage.getItem("token"))
        data.append("title", title.value)
        data.append("tags", tags)
        data.append("file", file)

        await this.setState({buttonEnabled : false})
        
        const response = await postData('/meme/add', data)

        if (response.error) {
            await this.setState({buttonEnabled : true})
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            await this.setState({
                homeRedirect : true
            })
            this.context.setAlert(
                "Meme added successfully! 😈",
                "success"
            )
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
                    alert : {
                        message : null,
                        type : null
                    }
            }})

            return
        }

        if(!pattern.title.exec(title))
        {
            this.setState({
                title : {
                    value : null,
                    correct : false,
                    alert : {
                        message : "Incorrect title! Min. 6 signs",
                        type : "danger"
                    }
            }})

            return

        }

        this.setState({
            title : {
                value : title,
                correct : true,
                alert : {
                    message : "Acceptable", 
                    type : "success"
                }
        }})
    }

    
    render() {
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
                <div className="space row container-fluid">
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
                                    <input required={true} type="text" className={formError(this.state.title.alert)} onBlur={this.handleTitleOnBlur} placeholder="Lana drahrepus" />
                                    {formMessage(this.state.title.alert)}
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
                            </div>

                            {/* File name */}
                            <div className="row justify-content-center">
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


    listTags = () => {
        const elements = document.getElementById("tagSelect")
        let tags = []
        Array.from(elements).forEach(function (element) {
            if(element.selected){
                tags.push(element.value)
            }
        })

        return tags
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

        }
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

        const response = await getData('/tag/')

        if (response.error) {
            await this.context.setAlert(response.error.message, response.error.type)
        }else{
            await this.setState({tags : response.data.tags})
        }
    }


    componentWillUnmount(){
        this.context.setAlert(null, null)
    }


    componentDidMount = async() => {
        await this.getTags()
    }
}

AddMeme.contextType = Context

export default AddMeme