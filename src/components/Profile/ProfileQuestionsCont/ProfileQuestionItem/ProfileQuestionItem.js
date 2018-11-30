import React, { Component } from 'react'
import { connect } from 'react-redux';
import Avatar from '../../../universal/Avatar/Avatar';
import './ProfileQuestionItem.scss';

class ProfileQuestionItem extends Component {
    render() {
        return (
            <div className='question_item_container'>
                <div className='question_item_content'>
                    <div className='question_item_title'>
                        Create a Storage Reference on Web
                    </div>
                    <div className='question_item_desc flex align_center'>
                        <div className='flex_grow'>
                            Your files are stored in a Google Cloud Storage bucket. The files in this bucket are presented in a hierarchical structure, just like the file system on your local hard disk, or the data in the Firebase Realtime Database.
                        </div>
                        <div className='flex align_center'>
                            <div className='flex question_item_scores'>
                                <div>15</div>
                                <div>30</div>
                            </div>
                            <div className='flex question_item_user align_center'>
                                <div className='question_item_avatar'>
                                    <Avatar />
                                </div>
                                <div className='question_item_writer'>
                                    <div>ErkarAnun</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='question_item_footer flex justify_between'>
                        <div className='question_item_skill'>
                            <span>Doctor</span>
                            <span>Driver</span>
                        </div>
                        <div className='question_item_date'>
                            <span>20/12/18</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};
export default connect(mapStateToProps)(ProfileQuestionItem);
