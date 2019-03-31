import React, { Component } from 'react'

import Context from '../Context/Context'
import getData from '../../services/getData'
import convertDate from '../../services/convertDate'
import "./DisplayMemes.css"

class DisplayMemes extends Component {

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
            <div className="space">
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
                                                Date: {convertDate(meme.date)}
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


    getMemes = async() => {
        const params={
            params : {
                page : this.state.page,
                limit : 10
            }
        }

        const response = await getData('/meme/', params)

        if (response.error) {
            this.context.setAlert(response.error.message, response.error.type)

            return false
        }else{
            await this.setState({
                memes : response.data.memes
            })   
            
            return true
        }
    }


    getPage = async() => {

        const page = this.props.match.params.page

        if(isNaN(page)){
            await this.setState({page : 0})
        }
        else if(page < 0) {
            await this.setState({page : 0})
        } else{         
            const response = await getData('/meme/count')

            if (response.error) {
                this.context.setAlert(response.error.message, response.error.type)
            }else{
                const lastPage = Math.ceil(response.data.count/10)-1

                if(lastPage <= page){
                    await this.setState({page : lastPage})
                }else{
                    await this.setState({page : page})
                }
                await this.getMemes()
            }
        }

        await this.props.history.push("/memes/" + (this.state.page))
    }

    
    componentWillUnmount = async() => {
        await this.context.setAlert(null, null)
    }


    componentDidMount = async() => {
        await this.getPage()
        await this.getMemes()
    }
}

DisplayMemes.contextType = Context

export default DisplayMemes