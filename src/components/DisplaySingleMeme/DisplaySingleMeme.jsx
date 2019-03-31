import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import qs from 'qs'

import pattern from '../../config/Pattern'
import Context from '../Context/Context'
import postData from '../../services/postData'
import getData from '../../services/getData'
import convertDate from '../../services/convertDate'
import './DisplaySingleMeme.css'

class DisplaySingleMeme extends Component {

    state = {

        redirect : false,

        meme : null,

        comments : null,

        content : null
    }
    

    increaseRatingOnClick = async() => {

        const body = {
            "token" : localStorage.getItem("token"),
            "id" : this.state.meme._id
        }

        const response = await postData('/meme/rate', qs.stringify(body))

        if (response.error) {
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            await this.setState({
                meme : response.data.meme
            })
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

        const response = await postData('/comment/add', qs.stringify(body))

        if (response.error) {
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            await this.setState({
                content : null,
                comments : response.data.comments
            })   

            this.context.setAlert(
                "Comment added successfully!",
                "success"
            )

            this.refs.commentTextArea.value = "Hello I'm Mr. Puffin, share your opinion with me!"
        }
    }


    handleContentOnBlur = async (evt) =>{
        const content = evt.target.value

        this.setState({
            content : content
        })
    }

    
    render() {

        if(this.state.redirect){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/"
                    }}/>
               </React.Fragment>
            )
        }

        return (
            <div className="space">
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
                                        Date: {convertDate(this.state.meme.date)}
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
                                        {convertDate(comment.date)}
                                    </small>
                                </div> 
                            </div>      
                        )
                    })}
                </div>
            )
        }
        
    }


    getComments = async() => {

        const params={
            params : {
                memeId: this.props.match.params.id
            }
        }

        const response = await getData('/comment/', params)

        if (response.error) {
            await this.setState({redirect : true})
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            await this.setState({
                comments : response.data.comments
            }) 
        }
    }


    getMeme = async() => {

        const params={
            params : {
                id: this.props.match.params.id
            }
        }

        const response = await getData('/meme/single', params)

        if (response.error) {
            await this.setState({redirect : true})
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            await this.setState({
                meme : response.data.meme
            })  
        }
    }


    componentWillUnmount(){
        this.context.setAlert(null, null)
    }


    componentDidMount = async() =>{
        if(!this.context.state.signedIn){
            await this.setState({
                redirect : true,
            })

            this.context.setAlert(
                "You are not signed in!", 
                "danger"
            )
        }else{
            await this.getMeme()
            await this.getComments()
        }
    }
}

DisplaySingleMeme.contextType = Context

export default DisplaySingleMeme