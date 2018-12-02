import React, {Component} from 'react';
import QuestionItem from '../../universal/QuestionItem/QuestionItem';
import './QuestionsCont.scss';

export default class QuestionsCont extends Component {

  render() {
    return (
      <div className='questions_container'>
        <div className='question_item_header flex align_center'>
          <div className='flex_grow'>
            <div onClick={this.onclick}>Type</div>
          </div>
          <div className='flex question__item_header_txt'>
            <div>Votes</div>
            <div>Answers</div>
            <div className='empty_div'></div>
          </div>
        </div>
        {this.props.filteredQuestions.map(question => <QuestionItem key={question.id} title={question.title} description={question.description}
                                                               date={question.date} rate={question.rate}/>)}
      </div>
    )
  }
}

