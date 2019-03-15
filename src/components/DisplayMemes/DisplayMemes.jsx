import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'

import AlertContext from '../Alert/AlertContext'
import "./DisplayMemes.css"

class DisplayMemes extends Component {

    state = {

        loginRedirect : false,

        memes : null,

        page : 0

    }
    

    handleNextOnClick = async () =>{

        const page = this.state.page

        await this.setState({page : page + 1})

        if(await this.getMemes()){
            this.goTop() 
        }
    }


    handlePreviousOnClick = async () =>{

        const page = this.state.page

        if(page > 0){
            await this.setState({page : page - 1})
            this.getMemes()
            this.goTop()
        }
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

        return (
            <div>
                <div className="row container-fluid">
                    <div className="col-2"/>
                    <div className="col-8">
                        <div className="row justify-content-center">
                            {this.displayMemes()}
                        </div>

                        <br/>
                        <br/>

                        <div className="d-flex justify-content-start">
                            <button onClick={this.handleNextOnClick} className="btn btn-danger btn-lg btn-block m-1">
                                Next 
                                <span role="img" aria-label="streak"> 🔥🔥🔥</span>
                            </button>
                        </div>

                        {this.displayPrevious()}
                        
                        <br/>
                        <br/>
                        <br/>

                    </div>
                    <div className="col-2"/>
                </div> 
            </div>
        )
    }


    goTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    displayPrevious = ()=>{
        if(this.state.page === 0){
            return null
        }else{
            return(
                <div className="d-flex justify-content-end">
                    <button onClick={this.handlePreviousOnClick} className="btn btn-danger btn-lg btn-block m-1">
                        Previous 
                        <span role="img" aria-label="devil"> 🤬</span>
                    </button>
                </div>
            )
        }
    }
    

    displayMemes = ()=>{

        if(this.state.memes === null){
            return null
        }else{
            return(
                <div>

                    {this.state.memes.map((meme)=>{

                        const memeLink = "http://localhost:5000/meme/" + meme._id + "." + meme.type
                        const memeAlt = "Meme: " + meme._id

                        return (
                            <div key={meme._id}  className="card border-secondary text-white bg-dark m-4" >
                                <div className="card-header">
                                    <a className="text-white card-title h5" href={memeLink} alt={memeAlt} target="_blank" rel="noopener noreferrer">
                                        {meme.title}
                                    </a>
                                </div>

                                <div className="card-footer">
                                    <small>
                                        {meme.tags.map((tag)=>{
                                            return (
                                                <span key={tag} >
                                                    {" #" + tag}
                                                </span>
                                            )
                                        })}
                                    </small>
                                </div>
                                    
                                <img className="card-img-top p-1" src={memeLink} alt={memeAlt}/>
                            </div>
                        )
                    })}
                </div>
            )
        }
        
    }


    getMemes = async() => {

        const params={
            params : {
                page : this.state.page,
                limit : 10
            }
        }

        try{

            const response = await axios.get('/meme/', params)

            this.setState({
                memes : response.data.memes
            })   
            
            return true

        }catch(err){

            const status = err.response.status
            if(status === 400){
                await this.setState({page : this.state.page - 1})
                this.context.setAlert(102)
            }
            else if(status === 500){
                this.context.setAlert(0)
            }else{
                this.context.setAlert(0)
            }

            return false
        }
    }


    handleNotLogged(){
        if(!localStorage.getItem("token")){

            this.setState({
                loginRedirect : true,
            })

            this.context.setAlert(32)
        }
    }


    componentDidMount(){
        this.handleNotLogged()
        this.getMemes()
    }
}

DisplayMemes.contextType = AlertContext

export default DisplayMemes