// API calls for search bar
import React from 'react';
import axios from 'axios';

export default class HungrySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Hungry? Get snackin",
      luckyPressed: false,
      resultOfPress: "Loading...",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStarvingPress = this.handleStarvingPress.bind(this);
    this.handleFirstDatePress = this.handleFirstDatePress.bind(this);
    this.handleSearchPress = this.handleSearchPress.bind(this);
    this.handleCancelPress = this.handleCancelPress.bind(this);
  }

  // updates search bar
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Calls API from server; sets state of starving press to true; filter down results to cheap places
  // and then sets state of pressResult to html formatted result
  async handleStarvingPress() {
    let filteredCheapPlaces = [];
    this.setState({ luckyPressed: true });
    // API GET call to CHEAP fast food restaurats
    const result = await axios({
      method: 'post',
      url: `/search`,
      data: this.state.value
    }).then((res) => {
      console.log(res.data.message);
      filteredCheapPlaces = res.data.message.filter((r) => r.price === "$");
      console.log("Filtered cheap " + filteredCheapPlaces);

      // set state of press result
      this.setState({ resultOfPress: filteredCheapPlaces.map((place, i) => <span key={place.name + i} onClick={() => window.open(place.website, place.name)} >{place.name}</span>) });
    }).catch((err) => {
      console.error(err.response.data);
    });
  }

  async handleFirstDatePress() {
    let filteredExpensivePlaces = [];
    this.setState({ luckyPressed: true });
    // API GET call to EXPENSIVE, HIGH RATED restaurants
    const result = await axios({
      method: 'post',
      url: `/search`,
      data: this.state.value
    }).then((res) => {
      console.log(res.data.message);
      filteredExpensivePlaces = res.data.message.filter((r) => r.rating >= 4);
      console.log("Fitlered fancy " + filteredExpensivePlaces);

      this.setState({ resultOfPress: filteredExpensivePlaces.map((place, i) => <span key={place.name + i} onClick={() => window.open(place.website, place.name)}>{place.name}</span>) });
    }).catch((err) => {
      console.error(err.response.data);
    });
  }

  async handleSearchPress() {
    this.setState({ luckyPressed: true });
    // API GET call to EXPENSIVE, HIGH RATED restaurants
    const result = await axios({
      method: 'post',
      url: `/search`,
      data: this.state.value
    }).then((res) => {
      console.log(res.data.message);
      this.setState({ resultOfPress: res.data.message.map((place, i) => <span key={place.name + i} onClick={() => window.open(place.website, place.name)}>{place.name}</span>) });
    }).catch((err) => {
      console.error(err.response.data);
    });
  }

  async handleCancelPress() {
    this.setState({
      value: "Try another search...",
      luckyPressed: false,
      resultOfPress: "Loading...",
    });
  }

  render() {
    const buttons = <div className="luckyButtons">
      <div className="starving">
        <button className="starvingButton" onClick={this.handleStarvingPress}>I'm Starving</button>
      </div>
      <div className="firstDate">
        <button className="firstDateButton" onClick={this.handleFirstDatePress}>I Have a First Date</button>
      </div>
      <div className="search">
        <button className="searchButton" onClick={this.handleSearchPress}>→</button>
      </div>
    </div>

    return <div className="HungrySearch">
      <div className="mainTitle">
        <h1 className="titleText">So, You're Hungry?</h1>
        <form>
          <label>
            <input className="searchBarInput"
              type="text"
              onChange={this.handleChange}
              value={this.state.value}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  this.handleSearchPress();
                }
              }}
            />
          </label>
        </form>
      </div>
      {!this.state.luckyPressed ? buttons : <div className="searchResults">{this.state.resultOfPress}</div>}
      {!this.state.luckyPressed ? "" : <button className="cancelButton" onClick={this.handleCancelPress}>Cancel</button>}
    </div>
  }
}