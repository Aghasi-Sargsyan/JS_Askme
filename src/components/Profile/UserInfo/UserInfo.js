import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import male from "../../../assets/icons/male.png";
import female from "../../../assets/icons/female.png";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import Modal from "../../universal/Modal/Modal";
import FireManager from "../../../firebase/FireManager";
import { bindActionCreators } from "redux";
import { actionAddUserData } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import defaultAvatar from '../../../assets/profileImg.png';
import { withStyles } from '@material-ui/core/styles'
import "./UserInfo.scss";

class UserInfo extends Component {

    state = {
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",
        showModal: false
    };

    showModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    hideModal = () => {
        this.setState({
            showModal: !this.state.showModal,
            avatarURL: ""
        });
    };

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({
                avatar: filename,
                progress: 100,
                isUploading: false,
                avatarURL: url
            }))
            .catch(err => console.error(err))
    };

    handleUpload = () => {
        this.hideModal();
        FireManager.updateUser({ photoUrl: this.state.avatarURL }, this.props.user.id);
        this.props.dispatchUser({ photoUrl: this.state.avatarURL });
    };

    render() {
        const { userName, age, gender, photoUrl } = this.props.user;
        const { classes } = this.props;
        return (
            <div className='user_info'>
                <div className="user_info_img flex flex_col">
                    <Modal show={this.state.showModal} handleClose={this.hideModal}>
                        <div className='flex_col'>
                            {this.state.isUploading
                                ? <p>Progress: {this.state.progress}%</p>
                                : this.state.avatarURL ?
                                    <Avatar className={classes.avatar} onClick={this.showModal} src={this.state.avatarURL} /> :
                                    <Avatar className={classes.avatar} onClick={this.showModal} src={photoUrl} />
                            }

                            <FileUploader
                                accept="image/*"
                                name="avatar"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onProgress={this.handleProgress}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                            />
                        </div>

                        <button className="upload__img-btn" onClick={this.handleUpload}>Upload profile image</button>
                    </Modal>
                    <Avatar className={classes.avatar} src={photoUrl ? photoUrl : defaultAvatar} />
                    <button onClick={this.showModal}>Add profile image</button>
                </div>
                <div>
                    <div className="user_info_item user_info_name">
                        <label className="username__label">Username:</label>
                        <span>{userName}</span>
                    </div>
                    <div className="user_info_item user_info_age">
                        <label className="age__label">Age:</label>
                        <span>{age}</span>
                    </div>
                    <div className="user_info_item user_info_gender">
                        <label className="gender__label">Gender:</label>
                        <span>{gender && <img src={gender === "male" ? male : female} alt="gender" />}</span>
                    </div>
                    <div className="user_info_item user_info_skills">
                        <label className="skills__label">Skills</label>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    avatar: {
        width: 180,
        height: 180,
    },

});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(UserInfo));