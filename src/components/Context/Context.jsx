import React from 'react'

const ReactContext = React.createContext()

export class Context extends React.Component {
    state = {
        alert : {
            message : null,
            type : null
        },
        signedIn : null,
        selectedTags : null
    }

    render() {
        return (
            <ReactContext.Provider value = {{
                    state : this.state,
                    setAlert : (message, type) => {
                        this.setState({
                            alert : {
                                message : message,
                                type : type
                            }
                        })
                    },
                    setSignedIn : (value) => {
                        this.setState({
                            signedIn : value
                        })
                    },
                    setSelectedTags : (value) => {
                        this.setState({
                            selectedTags : value
                        })
                    }
                }}>
                {this.props.children}
            </ReactContext.Provider>
        )
    }
}

export default ReactContext