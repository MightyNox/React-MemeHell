import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'

import pattern from '../../config/Pattern'
import Context from '../Context/Context'
import './DisplaySingleMeme.css'

class DisplaySingleMeme extends Component {

    state = {

        loginRedirect : false,
        homeRedirect : false,

        meme : null,

        comments : null,

        content : null
    }
    

    increaseRatingOnClick = async() => {

        const body = {
            "token" : localStorage.getItem("token"),
            "id" : this.state.meme._id
        }

        try{

            const response = await axios.post('/meme/rate', qs.stringify(body))

            this.setState({
                meme : response.data.meme
            })   

        }catch(err){

            const status = err.response.status

            if(status === 400){
                this.context.setAlert(
                    "You have rated this meme!",
                    "danger"
                )
            }
            else if(status === 500){
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


    addCommentOnClick = async() => {

        const content = this.state.content

        if(!pattern.comment.exec(content))
        {
            this.context.setAlert(
                "Comment is too short!",
                "danger"
            )
            return
        }

        const body = {
            "token" : localStorage.getItem("token"),
            "content" : content,
            "memeId" : this.state.meme._id
        }

        try{

            const response = await axios.post('/comment/add', qs.stringify(body))

            await this.setState({
                content : null,
                comments : response.data.comments
            })   

            this.context.setAlert(
                "Comment added successfully!",
                "success"
            )

            this.refs.commentTextArea.value = "Hello I'm Mr. Puffin, share your opinion with me!"

        }catch(err){

            const status = err.response.status

            if(status === 400){
                this.context.setAlert(
                    "This comment is incorrect!",
                    "danger"
                )
            }
            else if(status === 500){
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


    handleContentOnBlur = async (evt) =>{
        const content = evt.target.value

        this.setState({
            content : content
        })
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
            <div>
                <div className="row container-fluid">
                    <div className="col-2"/>
                    <div className="col-8">
                        <div className="row justify-content-center">
                            {this.displayMeme()}
                        </div>
                        <div className="row justify-content-center">
                            {this.displayCommentForm()}
                        </div>
                        <div className="row justify-content-center">
                            {this.displayComments()}
                        </div>
                        <br/><br/><br/><br/>
                    </div>
                    <div className="col-2"/>
                </div>
            </div>
        )
    }


    displayMeme = ()=>{
        if(this.state.meme === null){
            return null
        }else{
            return(
                <div key={this.state.meme._id}  className="card border-secondary text-white bg-dark m-2" >
                    <div className="card-header">
                            <span className="text-white card-title h5">
                                {this.state.meme.title}
                            </span>
                        </div>

                    <div className="card-footer">
                            <small>
                                {this.state.meme.tags.map((tag)=>{
                                    return (
                                        <span key={tag} >
                                            {" #" + tag}
                                        </span>
                                    )
                                })}
                            </small>
                        </div>
                                    
                    <img className="card-img-top p-1" src={"/meme/" + this.state.meme._id + "." + this.state.meme.type} alt={"Meme: " + this.state.meme._id}/>

                    <div className="card-footer">
                            <div className="row">
                                <div className="col text-left">
                                    <small>
                                        Author: {this.state.meme.author}
                                    </small>
                                </div>
                                <div className="col text-center">
                                    <small>
                                        Date: {this.convertDate(this.state.meme.date)}
                                    </small>
                                </div>
                                <div className="col text-right">
                                    <small>
                                        <button className="btn btn-danger btn-sm" onClick={this.increaseRatingOnClick}>
                                            +
                                        </button>
                                        &ensp;
                                        {this.state.meme.rating.value}  
                                        <span role="img" aria-label="streak"> 🔥</span>
                                    </small>
                                </div>
                            </div>
                        </div>
                </div>
            )
        }
        
    }


    displayCommentForm = ()=>{
        
        return (
            <div className="card border-secondary text-white bg-dark">
                <div className="card-body row form-group">
                    <div className="col-xs-8 col-md-9 col-xl-10">
                        <div className="row justify-content-center">
                            <textarea className="form-control ml-1 mr-1" ref="commentTextArea" rows="3" placeholder="Hello I'm Mr. Puffin, share your opinion with me!" onBlur={this.handleContentOnBlur} />
                        </div>
                    </div>
                    <div className="col-xs-4 col-md-3 col-xl-2">
                        <div className="row justify-content-center">
                            <button className="btn btn-danger ml-1 mr-1" onClick={this.addCommentOnClick}>
                                Add Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }


    displayComments = ()=>{
        const comments = this.state.comments
        if(comments === null || comments.length === 0){
            return null
        }else{
            return (
                <div className="card border-secondary text-white bg-dark mt-2">
                    {this.state.comments.map((comment)=>{
                        return (
                            <div className="card-body row form-group p-2">
                                <div className="col-xs-4 col-md-3 col-xl-2 bg-secondary">
                                    {comment.author}
                                </div>
                                <div className="col-xs-7 col-md-6 col-xl-8">
                                    {comment.content}
                                </div> 
                                <div className="col-xs-1 col-md-3 col-xl-2">
                                    <small>
                                        {this.convertDate(comment.date)}
                                    </small>
                                </div> 
                            </div>      
                        )
                    })}
                </div>
            )
        }
        
    }


    convertDate = (date) => {
        const dateToConvert = new Date(date)
        let day = dateToConvert.getDate();
        let month = dateToConvert.getMonth();
        let year = dateToConvert.getFullYear();

        if(day.toString().length === 1){
            day = "0"+day
        }

        if(month.toString().length === 1){
            month = "0"+month
        }

        return (day+'-'+month+'-'+year)
    }


    getComments = async() => {
        try{
            const params={
                params : {
                    memeId: this.props.match.params.id
                }
            }

            const response = await axios.get('/comment/', params)

            this.setState({
                comments : response.data.comments
            })   

        }catch(err){

            const status = err.response.status

            if(status === 500){
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

            await this.setState({homeRedirect : true})
        }
    }


    getMeme = async() => {

        const params={
            params : {
                id: this.props.match.params.id
            }
        }

        try{

            const response = await axios.get('/meme/single', params)

            this.setState({
                meme : response.data.meme
            })   

        }catch(err){

            const status = err.response.status

            if(status === 400){
                await this.setState({page : this.state.page - 1})
                this.context.setAlert(
                    "Meme not found! 👿",
                    "danger"
                )
            }
            else if(status === 500){
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

            await this.setState({homeRedirect : true})
        }
    }


    async handleNotLogged(){
        if(!localStorage.getItem("token")){

            await this.setState({
                loginRedirect : true,
            })

            this.context.setAlert(
                "You are not signed in!", 
                "danger"
            )
        }
    }


    componentWillUnmount(){
        if(this.context.state.alert !== null){
            this.context.setAlert(null, null)
        }
    }


    async componentDidMount(){
        await this.handleNotLogged()

        if(!this.state.loginRedirect){
            await this.getMeme()
            await this.getComments()
        }
    }
}

DisplaySingleMeme.contextType = Context

export default DisplaySingleMeme