import React from 'react';
import avatar from "../../../assets/profileImg.png";
// import Avatar from 'react-avatar-edit'

import "./Avatar.scss";

const Avatar = () => <img src={avatar} alt="avatar" />;

// class ProfilePic extends React.Component {

//     constructor(props) {
//         super(props)
//         const src = '../../../assets/profileImg.png'
//         this.state = {
//             preview: null,
//             src
//         }
//         this.onCrop = this.onCrop.bind(this)
//         this.onClose = this.onClose.bind(this)
//     }

//     onClose() {
//         this.setState({ preview: null })
//     }

//     onCrop(preview) {
//         this.setState({ preview })
//     }

//     render() {
//         return (
//             <div>
//                 <Avatar
//                     width={390}
//                     height={295}
//                     onCrop={this.onCrop}
//                     onClose={this.onClose}
//                     src={this.state.src}
//                 />
//                 <img src={this.state.preview} alt="Preview" />
//             </div>
//         )
//     }
// }


export default Avatar;