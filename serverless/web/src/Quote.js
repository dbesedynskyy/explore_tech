import React, { Component } from 'react';
import config from './config.json'

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {
            quote: {
                id: 0,
                author: "",
                quote: ""
            }
        };
    }

    componentDidMount() {
        fetch(config.api_uri)
        .then(results => {
            return results.json();
        })
        .then(data => {
            this.setState({quote: data});
        })
    }

    render() {
      return (
        <div className="shopping-list">
          <h1>{this.state.quote.quote}</h1>
          {this.state.quote.author}
        </div>
      );
    }
}

  export default Quote;