import React, { Component } from 'react'

import Context from '../Context/Context'
import getData from '../../services/getData'
import "./SelectCategory.css"

class SelectCategory extends Component {

    state = {

        tags : null,

    }
    

    
    render() {
        return (
            <React.Fragment>
                <div className="space row container-fluid">
                    <div className="col-2"/>

                    <div className="col-8">
                        <div className="row justify-content-center">
                            {this.displaySelect()}
                        </div>
                    </div>

                    <div className="col-2"/>
                </div>
            </React.Fragment>
        )
    }


    displaySelect = () => {
        if(!this.state.tags){
            return <p>There are no tags!</p>
        }else{
            return(
                <div className="card border-secondary text-white bg-dark mt-2">
                    <div className="form-inline card-body">
                        {this.state.tags.map((tag) => 
                            <div class="custom-control custom-checkbox pr-4">
                                <input type="checkbox" class="custom-control-input" id={tag._id}/>
                                <label class="custom-control-label" for={tag._id}>
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
            await this.context.setAlert(response.error.message, response.error.type)
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