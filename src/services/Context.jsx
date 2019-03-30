import React from 'react'

const Context = React.createContext()

export class AlertProvider extends React.Component {
    state = {
        alert : null
    }

    render() {
        return (
            <Context.Provider value = {{
                state : this.state,
                setAlert : (value) => this.setState(
                    {alert : value}
                )}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context