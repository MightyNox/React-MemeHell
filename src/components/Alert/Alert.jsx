import React, { Component } from 'react'

import Context from '../Context/Context'

class Alert extends Component {

    handleAlertOnClick = ()=>{
        this.context.setAlert(null, null)
    }
    
    render() {
        return(
            <div>
                {this.displayAlert()}
            </div>
        )
    }

    displayAlert(){
        
        const alert = this.context.state.alert

        if(alert.message !== null){
            return(
                <div className={"alert alert-"+ alert.type +" alert-dismissible"}>
                    {alert.message}
                    <button type="button" onClick={this.handleAlertOnClick} className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
            
        }else{
            return
        }
    }
}

Alert.contextType = Context

export default Alert