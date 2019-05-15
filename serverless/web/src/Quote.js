import React, { Component } from 'react';
import config from './config.json'

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {
            class: "App-progress-1",
            quote: {
                id: 0,
                author: "",
                quote: ""
            }
        };
    }

    updateQuote() {
        console.log(config.api_uri)
        this.setState({class: "App-progress-2"});
        fetch(config.api_uri)
        .then(results => {
            return results.json();
        })
        .then(data => {
            this.setState({quote: data, class: "App-progress-1"});
        })
    }

    componentDidMount() {
        var intervalId = setInterval(() => this.updateQuote.call(this), 11000)
        this.setState({intervalId: intervalId});
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }
    render() {
      return (
        <div>
            <div className={`${this.state.class}`}></div>
            <div className="App-quote">
                <h1>{this.state.quote.quote}</h1>
                {this.state.quote.author}
            </div>
        </div>
      );
    }
}

  export default Quote;