import React, { Component } from 'react';
import './Tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    }
  }

  clickHandler = (index, e) => {
    e.preventDefault();
    this.setState({
      selected: index
    });
  }

  rendTabLabels() {
    const labels = (child, index) => {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a className={activeClass} onClick={(e) => this.clickHandler(index, e)} href="#">
            {child.props.label}
          </a>
        </li>
      );
    }

    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels)}
      </ul>
    );
  }

  render() {
    return (
      <div className="tabs">
        {this.rendTabLabels()}

        <div className="tabs__content">
          {this.props.children[this.state.selected]}
        </div>
      </div>
    );
  }
}

export default Tabs;