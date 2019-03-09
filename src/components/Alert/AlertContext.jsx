import React from 'react'

const AlertContext = React.createContext()

export class AlertProvider extends React.Component {
    state = {
        alert : null
    }

    render() {
        return (
            <AlertContext.Provider value = {{
                state : this.state,
                setAlert : (value) => this.setState(
                    {alert : value}
                )}}>
                {this.props.children}
            </AlertContext.Provider>
        )
    }
}

export default AlertContext