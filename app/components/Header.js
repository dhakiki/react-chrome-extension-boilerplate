import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

var Promise = require('bluebird')

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave = () => {
    console.log('handle save')
    chrome.tabs.getSelected(null, tab => {
      chrome.extension.getBackgroundPage().console.log(tab.url);
      this.props.addTodo(tab.url);
    })
  };

  componentDidMount() {
    chrome.extension.getBackgroundPage().console.log('loaded');
  }

  render() {
    return (
      <div onClick={this.handleSave}>+ Add Current Page</div>
    )
  }
}

//    return (
//      <header>
//        <h1>todos</h1>
//        <TodoTextInput
//          newTodo
//          onSave={this.handleSave}
//          placeholder="What needs to be done?"
//        />
//      </header>
//    );
