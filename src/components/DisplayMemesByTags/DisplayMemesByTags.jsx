import React, { Component } from 'react'
import axios from 'axios'

import Context from '../Context/Context'
import "./DisplayMemesByTags.css"

class DisplayMemesByTags extends Component {

    state = {

        memes : null,

        page : 0

    }
    

    handleNextOnClick = async () =>{

        const page = parseInt(this.state.page) + 1

        await this.setState({page : page})

        if(await this.getMemes()){
            this.props.history.push("/memes/" + page)
            this.goTop() 
        }else{
            await this.setState({page : (page-1)})
        }
    }


    handlePreviousOnClick = async () =>{

        const page = this.state.page

        if(page > 0){
            await this.setState({page : page - 1})
            await this.getMemes()
            this.props.history.push("/memes/" + (page - 1))
            this.goTop()
        }
    }

    
    render() {
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

                        {this.displayPreviousButton()}
                        
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


    displayPreviousButton = ()=>{
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

                        const memeLink = "/meme/" + meme._id 
                        const memeAlt = "Meme: " + meme._id

                        return (
                            <div key={meme._id}  className="card border-secondary text-white bg-dark m-4" >
                                <div className="card-header">
                                    <a className="text-white card-title h5" href={memeLink} alt={memeAlt} rel="noopener noreferrer">
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
                                    
                                <img className="card-img-top p-1" src={memeLink + "." + meme.type} alt={memeAlt}/>

                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col text-left">
                                            <small>
                                                Author: {meme.author}
                                            </small>
                                        </div>
                                        <div className="col text-center">
                                            <small>
                                                Date: {this.convertDate(meme.date)}
                                            </small>
                                        </div>
                                        <div className="col text-right">
                                            <small>
                                                {meme.rating.value}  <span role="img" aria-label="streak"> 🔥</span>
                                            </small>
                                        </div>
                                    </div>
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


    getMemes = async() => {
        const params={
            params : {
                page : this.state.page,
                limit : 10
            }
        }

        try{

            const response = await axios.get('/meme/', params)

            await this.setState({
                memes : response.data.memes
            })   
            
            return true

        }catch(err){

            const status = err.response.status
            if(status === 400){
                const response = await axios.get('/meme/count')
                const lastPage = Math.ceil(response.data.count/10)-1

                if(lastPage !== -1){
                    await this.setState({page : lastPage})
                    this.props.history.push("/memes/" + (lastPage))
                    await this.getMemes()
                }
                
                this.context.setAlert(
                    "There are no more memes! 👿",
                    "info"
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

            return false
        }
    }


    getPage = async() => {

        const page = this.props.match.params.page

        if(isNaN(page)){
            await this.setState({page : 0})
        }else{
            await this.setState({page : this.props.match.params.page})
        }
    }

    
    componentWillUnmount = async() => {
        if(this.context.state.alert !== null){
            await this.context.setAlert(null, null)
        }
    }


    componentDidMount = async() => {
        await this.getPage()
        await this.getMemes()
    }
}

DisplayMemesByTags.contextType = Context

export default DisplayMemesByTags