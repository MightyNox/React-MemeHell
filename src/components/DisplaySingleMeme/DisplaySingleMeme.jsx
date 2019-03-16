import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'

import AlertContext from '../Alert/AlertContext'

class DisplaySingleMeme extends Component {

    state = {

        loginRedirect : false,
        homeRedirect : false,

        meme : null,

    }
    

    IncreaseRatingOnClick = async() => {

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
                this.context.setAlert(104)
            }
            else if(status === 500){
                this.context.setAlert(0)
            }else{
                this.context.setAlert(0)
            }
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
                <div>
                    <div key={this.state.meme._id}  className="card border-secondary text-white bg-dark m-4" >
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
                                        <button className="btn btn-danger btn-sm" onClick={this.IncreaseRatingOnClick}>
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
                this.context.setAlert(103)
            }
            else if(status === 500){
                this.context.setAlert(0)
            }else{
                this.context.setAlert(0)
            }

            await this.setState({homeRedirect : true})
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


    componentWillUnmount(){
        if(this.context.state.alert !== null){
            this.context.setAlert(null)
        }
    }


    componentDidMount(){
        this.handleNotLogged()
        this.getMeme()
    }
}

DisplaySingleMeme.contextType = AlertContext

export default DisplaySingleMeme