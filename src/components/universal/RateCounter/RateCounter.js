import React, { Component } from "react";
import './RateCounter.scss';

class RateCounter extends Component {
    state = {
        vote: 0
    }

    incrementVote = () => {
        this.setState({ vote: this.state.vote + 1 });
    }

    decrementVote = () => {
        this.setState({ vote: this.state.vote - 1 });
    }

    render() {
        return (
            <div className='answer__page flex align_center flex_col'>
                <button onClick={this.incrementVote}>+</button>
                <span>{this.state.vote}</span>
                <button onClick={this.decrementVote}>-</button>
            </div>
        )
    }
}

export default RateCounter
