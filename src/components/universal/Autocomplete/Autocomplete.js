import React, { Component } from "react";
import './Autocomplete.scss';

class Autocomplete extends Component {
    state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: this.props.value
    };

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
        this.props.changeHandler(e.target.value)
    };

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        this.props.changeHandler(e.currentTarget.innerText)
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={this.onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }

        return (
            <>
                <input
                    type="text"
                    onChange={this.onChange}
                    value={this.state.userInput}
                    className={this.props.className}
                    onKeyDown={this.onKeyDown}
                />
                {suggestionsListComponent}
            </>
        );
    }
}

export default Autocomplete;