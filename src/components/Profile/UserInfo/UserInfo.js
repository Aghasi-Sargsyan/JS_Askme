
import React, { Component } from "react";
import male from "../../../assets/icons/male.png";
import female from "../../../assets/icons/female.png";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import FireManager from "../../../firebase/FireManager";
import { bindActionCreators } from "redux";
import { actionAddUserData } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
import defaultAvatar from '../../../assets/profileImg.png';
import { withStyles, Avatar, Modal, Button } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import "./UserInfo.scss";

class UserInfo extends Component {

    state = {
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
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
        this.handleClose();
        FireManager.updateUser({ photoUrl: this.state.avatarURL }, this.props.user.id);
        this.props.dispatchUser({ photoUrl: this.state.avatarURL });
    };

    render() {
        const { userName, age, gender, photoUrl } = this.props.user;
        const { classes } = this.props;
        return (
            <div className='user_info'>
                <div className="user_info_img flex flex_col">
                    <Modal open={this.state.open}>
                        <div className={classes.paper}>
                            <div className='flex_col'>
                                {this.state.isUploading
                                    ? <p>Progress: {this.state.progress}%</p>
                                    : this.state.avatarURL ?
                                        <Avatar className={classes.modalAvatar} src={this.state.avatarURL} /> :
                                        <Avatar className={classes.modalAvatar} src={photoUrl} />
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
                            <button className="modal__close-btn" onClick={this.handleClose}>x</button>
                            <Button className={classes.uploadBtn} onClick={this.handleUpload}>Upload profile
                                image</Button>
                        </div>
                    </Modal>
                    <Avatar className={classes.avatar} src={photoUrl ? photoUrl : defaultAvatar} />
                    <button onClick={this.handleOpen}>Add profile image</button>
                </div>
                <div>
                    <div className="user_info_item user_info_name">
                        <label className="username__label">Username:</label>
                        <span>{userName}</span>
                    </div>
                    <div className="user_info_item user_info_age">
                        <label className="age__label">Age:</label>
                        <span>{new Date().getFullYear() - age}</span>
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
    avatar: {
        width: 180,
        height: 180,
    },
    paper: {
        position: 'fixed',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        display: "flex",
        width: "calc(100% - 700px)",
        height: 270,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: '40px 30px',
        alignItems: "flex-end",
        justifyContent: "space-between",
        "& div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        "& p": {
            fontWeight: "bold",
            marginBottom: 65
        },
        "& input": {
            marginTop: 10
        }
    },
    modalAvatar: {
        width: 120,
        height: 125,
        marginBottom: 5,
        overflow: "hidden"
    },
    uploadBtn: {
        border: "1px solid #04a9f5",
        height: 40,
        borderRadius: 3,
        color: "#fff",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: '#04a9f5',
        "&:hover": {
            color: "#04a9f5",
            backgroundColor: "#fff",
        }
    },
    editIcon: {
        display: "none",
        position: "relative",
        bottom: 75,
        left: 47
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser: bindActionCreators(actionAddUserData, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(UserInfo));