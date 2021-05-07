// API calls for search bar
import React from 'react';
import Timer from './Timer.js';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // timer: "60", // Counts down from 60 seconds
            // over: false, // True when timer runs out
            score: 0,
            answer: "", // Set to chosen answer from up, down, left, right
            // up: "red", // Top color swab answer option
            // down: "green", // Bottom color swab answer option
            // left: "blue", // Left color swab answer option
            // right: "yellow", // Right color swab answer option
            round: 0, // iterates through gameRounds
            // hard coded questions and options with changing correct answers from render()
            gameRounds: [{ question: "Choose the color of the following word's text: ", type: "color", color: "blue",answers: {up: "red",down: "green",left: "blue",right: "yellow",}},
                {question: "Choose the color the following word describes: ", type: "meaning", color: "blue",answers: {up: "blue",down: "green",left: "red",right: "yellow",}},
                {question: "Choose the color of the following word's text: ", type: "color", color: "purple",answers: {up: "green",down: "purple",left: "blue",right: "yellow",}},
                {question: "Choose the color the following word describes: ",  type: "meaning", color: "yellow",answers: {up: "red",down: "green",left: "blue",right: "yellow", }},
                {question: "Choose the color the following word describes: ",  type: "meaning", color: "orange",answers: {up: "green",down: "orange",left: "red",right: "pink",}},
                {question: "Choose the color of the following word's text: ",  type: "color", color: "brown",answers: {up: "brown",down: "red",left: "yellow",right: "green",}},
                {question: "Choose the color the following word describes: ",  type: "meaning", color: "blue",answers: {up: "blue",down: "red",left: "purple",right: "orange",}},
                {question: "Choose the color the following word describes: ",  type: "meaning", color: "yellow",answers: {up: "blue",down: "red",left: "green",right: "yellow",}},
                {question: "Choose the color of the following word's text: ",  type: "color", color: "pink",answers: {up: "pink",down: "orange",left: "yellow",right: "brown",}},
                {question: "Choose the color the following word describes: ",  type: "meaning", color: "purple",answers: {up: "pink",down: "purple",left: "red",right: "blue",}}
            ]
        };
        this.handleArrowKeyPress = this.handleArrowKeyPress.bind(this);
    }

    componentDidMount() {
        // bind keypress to window
        document.addEventListener("keydown", e => {
            this.handleArrowKeyPress(e);
        });

        // this.setState({
        //     up: this.state.gameRounds[this.state.round].answers.up,
        //     down: this.state.gameRounds[this.state.round].answers.down,
        //     left: this.state.gameRounds[this.state.round].answers.left,
        //     right: this.state.gameRounds[this.state.round].answers.right
        // });

        // // Determine answer based on question type
        // if (this.state.gameRounds[this.state.round].type === "meaning") {
        //     this.setState({ answer: this.state.gameRounds[this.state.round].color });
        // } else if (this.state.gameRounds[this.state.round].type === "color") {
        //     this.setState({ answer: this.state.gameRounds[this.state.round].answers.up  });
        // };

        // this.setState({ round: this.state.round + 1})
    }


    handleArrowKeyPress(event) {
        event.preventDefault();
        if (event.key === 'ArrowUp') this.setState({ answer: this.state.gameRounds[this.state.round].answers.up });
        if (event.key === 'ArrowDown') this.setState({ answer: this.state.gameRounds[this.state.round].answers.down });
        if (event.key === 'ArrowRight') this.setState({ answer: this.state.gameRounds[this.state.round].answers.right });
        if (event.key === 'ArrowLeft') this.setState({ answer: this.state.gameRounds[this.state.round].answers.left });

        // Calculate score change from current round
        if (((this.state.answer === this.state.gameRounds[this.state.round].color)&&this.state.gameRounds[this.state.round].type==="meaning") 
            || ((this.state.answer === this.state.gameRounds[this.state.round].answers.up)&&this.state.gameRounds[this.state.round].type==="color")) {
            this.setState({ score: this.state.score + 1 });
        } else {
            this.setState({ score: this.state.score - 1 });
        }

        // Iterate through rounds
        if (this.state.round < 9) { 
            this.setState({ round: this.state.round + 1 }); 
        } else { 
            this.setState({ round: 0 }); 
        }

    }

    render() {
        return <div className="game">
            <div className="score"> <h1> Score: {this.state.score} </h1> </div>
            <Timer />
            <div className="gameQuestion"> {this.state.gameRounds[this.state.round].question} </div>
            <div className="color" style={{ color: this.state.gameRounds[this.state.round].answers.up }}> 
                {this.state.gameRounds[this.state.round].color}
            </div>
            <div className="answerChoices">
                <div className="up">
                    <span style={{
                        backgroundColor: this.state.gameRounds[this.state.round].answers.up,
                        height: "200px",
                        width: "200px"
                    }}>Up</span>
                </div>
                <div className="down">
                    <span style={{
                        backgroundColor: this.state.gameRounds[this.state.round].answers.down,
                        height: "200px",
                        width: "200px"
                    }}>Down</span>
                </div>
                <div className="left">
                    <span style={{
                        backgroundColor: this.state.gameRounds[this.state.round].answers.left,
                        height: "200px",
                        width: "200px"
                    }}>Left</span>
                </div>
                <div className="right">
                    <span style={{
                        backgroundColor: this.state.gameRounds[this.state.round].answers.right,
                        height: "200px",
                        width: "200px"
                    }}>Right</span>
                </div>
            </div>
        </div>
    }
}