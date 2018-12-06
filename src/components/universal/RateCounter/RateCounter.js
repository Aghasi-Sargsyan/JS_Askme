import React, { Component } from "react";
import './RateCounter.scss';

class RateCounter extends Component {
    state = {
        vote: 5,
        isIncrement: false,
        isDecrement: false,
    };

    incrementVote = () => {
        this.setState(prevState => ({
            vote: !this.state.isDecrement ? prevState.vote + 1 : prevState.vote + 2,
            isIncrement: true,
            isDecrement: false
        }));
    };

    decrementVote = () => {
        this.setState(prevState => ({
            vote: !this.state.isIncrement ? prevState.vote - 1 : prevState.vote - 2,
            isDecrement: true,
            isIncrement: false
        }));
    };

    render() {
        const { isIncrement, isDecrement } = this.state;

        return (
            <div className='rate__container flex align_center flex_col'>
                <button disabled={isIncrement} className='increment' onClick={this.incrementVote}></button>
                <span>{this.state.vote}</span>
                <button disabled={isDecrement} className='decrement' onClick={this.decrementVote}></button>
            </div>
        )
    }
}

export default RateCounter
