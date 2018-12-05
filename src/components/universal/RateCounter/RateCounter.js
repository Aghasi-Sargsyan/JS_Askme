import React, {Component} from "react";
import './RateCounter.scss';

class RateCounter extends Component {
    state = {
        incVote: 0,
        decVote: 0,
        vote: 5,
        isIncrement: false,
        isDecrement: false,
    };

    incrementVote = () => {
        // if (this.state.isDecrement) {
        //     console.log('inc', this.state.isDecrement)

        //     this.setState(prevState => ({
        //         vote: prevState.vote + 1,
        //         isIncrement: this.state.isIncrement
        //     }));
        // }
        this.setState(prevState => ({
            vote: prevState.vote + 1,
            isIncrement: !this.state.isIncrement
        }));
    };

    decrementVote = () => {
        // if (this.state.isIncrement) {
        //     console.log('dec', this.state.isIncrement)
        //     this.setState(prevState => ({
        //         vote: prevState.vote - 1,
        //         isIncrement: this.state.isIncrement
        //     }));
        // }
        this.setState(prevState => ({
            vote: prevState.vote - 1,
            isDecrement: !this.state.isDecrement
        }));
    };

    render() {
        const { isIncrement, isDecrement } = this.state;

        return (
            <div className='rate__container flex align_center flex_col'>
                <button disabled={isIncrement} className='increment' onClick={this.incrementVote}>+</button>
                <span>{this.state.vote}</span>
                <button disabled={isDecrement} className='decrement' onClick={this.decrementVote}>-</button>
            </div>
        )
    }
}

export default RateCounter
