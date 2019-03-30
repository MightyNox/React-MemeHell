import React, { Component } from 'react'

import Context from '../../services/Context'
import './Home.css'

class Home extends Component {

    render() {
        return (
            <div className="space">
                <div className="col">
                    <div className="row h1 justify-content-center">
                        Welcome To The Meme Hell! 
                        <span role="img" aria-label="devil"> 😈</span>
                    </div>
                    <div className="row  justify-content-center">
                    <video width="60%" height="50%" controls>
                        <source src="/featured/review.mp4" type="video/mp4"/>
                        Your browser does not support the videos!
                    </video>
                    </div>
                </div>

                <br/>
                <br/>
                
                <blockquote className="blockquote text-center">
            
                    <h1>Featured</h1>

                    <br/>

                    <p className="mb-0">
                        Meme hell is the most awesome source  <br/>
                        of gaining knowledge and sharing experiences <br/> with another people using memes! 
                        <span role="img" aria-label="*-*"> 🤩</span>
                    </p>
                    <footer className="blockquote-footer">Adam Mickiewicz</footer>

                    <br/>

                    <p className="mb-0">
                        It is the first time i can agree with the gentleman who wrote above. 
                        <span role="img" aria-label=":P"> 😜</span>
                    </p>
                    <footer className="blockquote-footer">Juliusz Słowacki</footer>

                    <br/>

                    <p className="mb-0">
                        Penguins and other specimens visit this site during the mating season. 
                        <span role="img" aria-label="penguin"> 🐧</span>
                    </p>
                    <footer className="blockquote-footer">Krystyna Czubówna read</footer>

                    <br/>

                    <p className="mb-0">
                        Even Caesar loves Meme Hell. 
                        <span role="img" aria-label="dagger"> 🔪</span>
                    </p>
                    <footer className="blockquote-footer">Brutus</footer>
                </blockquote>

                <br/>
                <br/>
                <br/>
            </div>
        )
    }

    componentWillUnmount(){
        if(this.context.state.alert !== null){
            this.context.setAlert(null)
        }
    }
}

Home.contextType = Context

export default Home