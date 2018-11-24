import React, { Component } from 'react'
import FireManager from '../../../firebase/FireManager';
import { connect } from 'react-redux';
import { auth } from "firebase";


class ProfileQuestionContainer extends Component {

    componentDidMount() {
        console.log(this.props)
        auth().onAuthStateChanged(user => {
            if (user) {
                FireManager.getQuestions(user.uid)
            }
        });
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dbUser: state.userReducer.dbUser,
    }
}
export default connect(mapStateToProps)(ProfileQuestionContainer);
