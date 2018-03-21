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
    expanded: PropTypes.bool.isRequired,
    setSelectingPageId: PropTypes.func.isRequired,
    clearSelectingPageId: PropTypes.func.isRequired,
    onToggleExpandedState: PropTypes.func.isRequired,
    currentSelectModeId: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    chrome.extension.getBackgroundPage().console.log(props.openPage);
    this.state = {
      editing: false,
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
    eleteTodo(todo.id);
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
        <div className={classnames({[style.view]: true, [style.active]: this.props.currentSelectModeId == todo.id})}>
          <button
            className={this.props.expanded ? style.collapse : style.expand}
            onClick={() => this.props.onToggleExpandedState(todo.id)}
          />
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
          {this.props.expanded &&
            <div className={style.itemsContainer}>
              {this.props.currentSelectModeId == '' &&
                <div className={style.addItem} onClick={() => this.props.setSelectingPageId(todo.id)}>+ Add Item</div>
              }
              {this.props.currentSelectModeId == todo.id &&
                <div className={style.cancelSelectMode} onClick={this.props.clearSelectingPageId}>Exit Selection Mode</div>
              }
            </div>
          }
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
