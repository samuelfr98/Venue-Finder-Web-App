// API calls for search bar
import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 60, // Counts down from 60 seconds
            over: false, // True when timer runs out
        };
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        setInterval(this.countDown, 1000);
    };

    countDown() {
        if (this.state.timer === 0) {
            this.setState({ timer: 0 })
        }
        else {
            this.setState({
                timer: this.state.timer - 1,
            });
        }
    }

    render() {

        return (this.state.timer !== 0) ? <div>
            <div className="timer"> <h1> Time: {this.state.timer} </h1> </div>
            <div className="instructions">
                <h1> Use the arrows to choose the correct color swab. Correct answers get a point. Answer incorrectly and you lose a point. You've got one minute! </h1>
                <button className="timerButton" onClick={this.startTimer}>Start Timer</button>
            </div>
        </div> : <div className="instructions"> <h1 style={{fontSize: "100px", fontWeight: "bolder"}}> GAME OVER! </h1> </div>
    }
}