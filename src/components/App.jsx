import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Counter from './Coutner'
import Home from './Home';
import Menu from './Menu';

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div className='container-fluid'>
                    <Menu></Menu>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/counter' component={Counter} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App