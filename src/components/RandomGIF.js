// API calls for search bar
import React from 'react';
import axios from 'axios';

export default class RandomGIF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gif: "",
            loading: true
        };

    }

    async componentDidMount() {
        const api_key = process.env.REACT_APP_GIF_API_KEY
        if (this.state.loading) {fetch(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag="foodporn"`, {method: "GET", rating: "g"})
            .then(r => {
                return r.json();
            }).then(r => {
                console.log(r.data.embed_url);
                this.setState({
                    loading: false,
                    gif: r.data.embed_url
                })
            });}
    }

    render() {
        return <div className="gif"><iframe title="foodgif" src={this.state.gif} style={{height: "300px", width: "600px"}}></iframe></div>
    }
}