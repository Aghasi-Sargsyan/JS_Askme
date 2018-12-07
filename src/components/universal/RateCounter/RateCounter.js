import React, { Component } from "react";
import './RateCounter.scss';

class RateCounter extends Component {
    state = {
        vote: 5,
    };

    incrementVote = () => {
        if (this.state.vote < 6) {
            this.setState({
                vote: this.state.vote + 1
            });
        }
    };

    decrementVote = () => {
        if (this.state.vote > 4) {
            this.setState({
                vote: this.state.vote - 1
            });
        }
    };

    render() {
        return (
            <div className='rate__container flex align_center flex_col'>
                <button className='increment' onClick={this.incrementVote}></button>
                <span>{this.state.vote}</span>
                <button className='decrement' onClick={this.decrementVote}></button>
            </div>
        )
    }
}

export default RateCounter;
