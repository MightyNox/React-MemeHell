import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'

import { Context } from '../Context/Context'
import Routes from '../Routes/Routes'
import Menu from '../Menu/Menu'

class App extends Component{
    render(){
        return(
            <Context>
                <BrowserRouter>
                    <div className='container-fluid'>
                        <Menu/>
                        <Routes/>
                    </div>
                </BrowserRouter>
            </Context>
        )
    }
}

export default App