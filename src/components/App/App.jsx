import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Counter from '../Counter/Coutner'
import Home from '../Home/Home';
import Menu from '../Menu/Menu';
import Register from '../Register/Register';
import Login from '../Login/Login';

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div className='container-fluid p-0'>
                    <Menu></Menu>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/counter' component={Counter} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App