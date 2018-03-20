import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import style from './TodoItem.css';

export default class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    openPage: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    chrome.extension.getBackgroundPage().console.log(props.openPage);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (text) => {
    const { todo, deleteTodo, editTodo } = this.props;
    if (text.length === 0) {
      deleteTodo(todo.id);
    } else {
      editTodo(todo.id, text);
    }
    this.setState({ editing: false });
  };

  // handleComplete = () => {
  //   const { todo, completeTodo } = this.props;
  //   completeTodo(todo.id);
  // };

  handleDelete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  openPage(url) {
    chrome.tabs.create({url})
  }

  render() {
    const { todo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button
            className={style.destroy}
            onClick={this.handleDelete}
          />
          <button
            className={style.openPage}
            onClick={() => this.openPage(todo.text)}
          />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          [style.completed]: todo.completed,
          [style.editing]: this.state.editing,
          [style.normal]: !this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
