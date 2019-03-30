import React, {Component} from 'react'

import { Context } from '../../services/Context'
import Routes from '../Routes/Routes';

class App extends Component{
    render(){
        return(
            <Context>
                <Routes/>
            </Context>
        )
    }
}

export default App