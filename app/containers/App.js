import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import * as SettingsActions from '../actions/settings';
import style from './App.css';

@connect(
  state => ({
    todos: state.todos,
    settings: state.settings,
  }),
  dispatch => ({
    actions: bindActionCreators(Object.assign({}, TodoActions, SettingsActions), dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { todos, settings, actions } = this.props;
   chrome.extension.getBackgroundPage().console.log(actions);

    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} settings={settings} actions={actions} />
      </div>
    );
  }
}
