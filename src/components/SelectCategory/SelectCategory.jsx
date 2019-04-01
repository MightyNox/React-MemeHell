import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

import Context from '../Context/Context'
import getData from '../../services/getData'
import "./SelectCategory.css"

class SelectCategory extends Component {

    state = {

        tags : null,
        homeRedirect : null,
        memesRedirect : null

    }
    

    handleSearchOnClick = async() => {
        const tags = this.state.tags

        let selectedTags = []
        Array.from(tags).forEach(function (element) {
            if(document.getElementById(element._id).checked){
                selectedTags.push(element.name)
            }
        })

        if(selectedTags.length === 0) {
            await this.context.setAlert("You have to select category!", "danger")
            return
        }else{
            await this.context.setSelectedTags(selectedTags)
            this.setState({memesRedirect : true})
        }
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

        if(this.state.memesRedirect){
            return (
                <React.Fragment>
                   <Redirect to={{
                       pathname: "/memes"
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
                            {this.displayCategories()}
                        </div>
                        <div className="row justify-content-center pt-4">
                            <button className="btn btn-danger" type="button" onClick={this.handleSearchOnClick}>
                                    Search
                            </button>
                        </div>
                    </div>

                    <div className="col-2"/>
                </div>
            </React.Fragment>
        )
    }


    displayCategories = () => {
        if(!this.state.tags){
            return 
        }else{
            return(
                <div className="card border-secondary text-white bg-dark mt-2">
                    <div className="form-inline card-body">
                        {this.state.tags.map((tag) => 
                            <div key={tag.name} className="checkbox-danger custom-control custom-checkbox pr-4">
                                <input type="checkbox" className="custom-control-input" id={tag._id}/>
                                <label className="custom-control-label" htmlFor={tag._id}>
                                    {tag.name}
                                </label>
                            </div>
                        )} 
                    </div>
                </div>
            )
        }
    }


    getTags = async() => {

        const response = await getData('/tag/')

        if (response.error) {
            await this.setState({homeRedirect : true})
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            await this.setState({tags : response.data.tags})
        }
    }

    
    componentWillUnmount = async() => {
        await this.context.setAlert(null, null)
    }


    componentDidMount = async() => {
        await this.getTags()
    }
}

SelectCategory.contextType = Context

export default SelectCategory