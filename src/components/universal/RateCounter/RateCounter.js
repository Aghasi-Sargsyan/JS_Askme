import React, {Component} from "react";
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
                <button onClick={this.incrementVote}>+</button>
                <span>{this.state.vote}</span>
                <button onClick={this.decrementVote}>-</button>
            </div>
        )
    }
}

export default RateCounter
