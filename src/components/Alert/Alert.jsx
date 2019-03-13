import React, { Component } from 'react'

import statusMessages from '../../config/Status'

import AlertContext from './AlertContext'

class Alert extends Component {

    displayAlert(){
        
        const alert = this.context.state.alert

        if(alert !== null){
            const statusMessage = statusMessages[alert]
            return(
                <div className={"alert alert-"+ statusMessage[1] +" alert-dismissible"}>
                    {statusMessage[0]}
                    <button type="button" onClick={this.handleAlertOnClick} className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
            
        }else{
            return
        }
    }

    handleAlertOnClick = ()=>{
        this.context.setAlert(null)
    }

    componentWillUnmount(){
        if(this.context.state.alert){
            this.context.setAlert(null)
        }
    }
    
    render() {
        return(
            <div>
                {this.displayAlert()}
            </div>
            
        )
    }
}

Alert.contextType = AlertContext

export default Alert