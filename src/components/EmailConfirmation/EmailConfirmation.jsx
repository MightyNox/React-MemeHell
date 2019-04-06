import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import getData from '../../services/getData'
import Context from '../Context/Context'
import './EmailConfirmation.css'

class EmailConfirmation extends Component {
   
    state = {
        redirect : null
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/login"/>
        }

        return(
            <div className="space">
                
            </div>
        )
    }


    confirmEmail = async() => {
        const params={
            params : {
                key : this.props.match.params.key
            }
        }

        const response = await getData('/auth/email-confirmed', params)

        if (response.error) {
            this.context.setAlert(response.error.message, response.error.type)
        }else{
            this.setState({redirect : true})
            this.context.setAlert("Email confirmed!", "success")
        }
    }


    componentDidMount = async() => {
        await this.confirmEmail()
    }
}

EmailConfirmation.contextType = Context

export default EmailConfirmation