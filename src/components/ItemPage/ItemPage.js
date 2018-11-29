import React, { Component } from "react";
import Question from "./Question/Question";
import Answer from "./Answer/Answer";
import Wysiwyg from "../universal/Wysiwyg/Wysiwyg";

class ItemPage extends Component {

    render() {
        return (
            <div>
                <Question />
                <hr />
                <Answer />
                <hr />
                <Wysiwyg />
            </div>
        )
    }
}

export default ItemPage;