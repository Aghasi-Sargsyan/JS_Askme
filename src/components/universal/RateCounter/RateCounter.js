import React, { Component } from "react";
import './RateCounter.scss';

class RateCounter extends Component {
    state = {
        vote: 0
    }

    incrementVote = () => {
        this.setState(prevState => ({
            vote: prevState.vote + 1
        }));
    }

    decrementVote = () => {
        this.setState(prevState => ({
            vote: prevState.vote - 1
        }));
    }

    render() {
        return (
            <div className='rate__container flex align_center flex_col'>
                <button className='increment' onClick={this.incrementVote}>+</button>
                {/* <input type="radio" name="rateCounter" value="+" onChange={this.incrementVote} /> */}
                <span>{this.state.vote}</span>
                {/* <input type="radio" name="rateCounter" value="-" onChange={this.decrementVote} /> */}
                <button className='decrement' onClick={this.decrementVote}>-</button>
            </div>
        )
    }
}

export default RateCounter
