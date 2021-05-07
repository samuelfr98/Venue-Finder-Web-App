import './App.css';
import React from 'react';
import ThirstySearch from './components/ThirstySearch.js';
import HungrySearch from './components/HungrySearch.js';
import Game from './components/Game.js';
import RandomGIF from './components/RandomGIF.js';
import ls from 'local-storage';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPressed: false,
      thirstyPressed: false,
      gamePressed: false,
      darkMode: ls.get("darkMode")
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleLoginPress = this.handleLoginPress.bind(this);
    this.handleGamePress = this.handleGamePress.bind(this);
    this.handleThirstyPress = this.handleThirstyPress.bind(this);
    this.handleDarkModePress = this.handleDarkModePress.bind(this);
  }

  componentDidMount() {
    this.state.darkMode ? document.body.classList.add("dark-mode") : document.body.classList.remove("dark-mode");
    document.body.style.zoom = 0.5;
  }

  handleDarkModePress() {
    document.body.classList.toggle("dark-mode");
    ls.set("darkMode", !this.state.darkMode)
    this.setState({
      darkMode: !ls.get("darkMode") ? false : ls.get("darkMode")
    });
  }

  handleLoginPress() {
    this.setState({
      thirstyPressed: false,
      loginPressed: !this.state.loginPressed,
      gamePressed: false
    });
    // API search query
  }

  handleThirstyPress() {
    this.setState({
      thirstyPressed: !this.state.thirstyPressed,
      loginPressed: false,
      gamePressed: false
    });
    // Switch template to Drink API
  }

  handleGamePress() {
    this.setState({
      thirstyPressed: false,
      loginPressed: false,
      gamePressed: !this.state.gamePressed
    });
  }
  // Switch to Game



  render() {
    const searchComponent = <div className="searchBar" id="searchBar">
                              {this.state.thirstyPressed ? <ThirstySearch /> : <HungrySearch />}
                            </div>

    return <div className="App">
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Quicksand" />
      {this.state.gamePressed ? <Game /> : searchComponent}
      <div className="thirsty">
        <button className="thirstyButton" onClick={this.handleThirstyPress}> {this.state.thirstyPressed ? "I'm Hungry" : "I'm Thirsty"} </button>
      </div>
      <div className="loginExpansion">
        <button className="loginExpansionButton" onClick={this.handleLoginPress}> {!this.state.loginPressed ? "Can't Decide What to Eat?" : <RandomGIF />} </button>
      </div>
      <div className="game">
        <button className="gameButton" onClick={this.handleGamePress}>{!this.state.gamePressed ? "Waiting for an open table?" : "Click to Exit Game"}</button>
      </div>
      <div className="darkMode">
        <button className="darkModeButton" onClick={this.handleDarkModePress}>{!this.state.darkMode ? "Dark Mode" : "Light Mode"}</button>
      </div>
    </div>
  }
}