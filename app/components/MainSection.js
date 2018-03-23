import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
// import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    pageLastSelectedFrom: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const { todos, settings, actions } = props;
    let expandedState = {}
    todos.forEach(({id}) => {
      if (id == settings.selectingPageId)
        expandedState[id] = true;
      else
        expandedState[id] = false;
    })
    chrome.extension.getBackgroundPage().console.log(expandedState);
    this.state = { filter: SHOW_ALL, expandedState };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    // if (todos.length > 0) {
    //   return (
    //     <input
    //       className={style.toggleAll}
    //       type="checkbox"
    //       checked={completedCount === todos.length}
    //       onChange={actions.completeAll}
    //     />
    //   );
    // }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    // if (todos.length) {
    //   return (
    //     <Footer
    //       completedCount={completedCount}
    //       activeCount={activeCount}
    //       filter={filter}
    //       onClearCompleted={this.handleClearCompleted}
    //       onShow={this.handleShow}
    //     />
    //   );
    // }
  }

  toggleExpandedState(id) {
    let newExpandedState = this.state.expandedState;
    newExpandedState[id] = !newExpandedState[id];
    this.setState({expandedState: newExpandedState});
  }

  collapseNonSelectPagesAndSet(idToBeSet) {
    let expandedState = {}
    this.props.todos.forEach(({id}) => {
      if (id == idToBeSet)
        expandedState[id] = true;
      else
        expandedState[id] = false;
    })
    this.setState({expandedState});
    this.props.actions.setSelectingPageId(idToBeSet);
  }

  render() {
    const { todos, settings, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    );

    return (
      <section className={style.main}>
        {this.renderToggleAll(completedCount)}
        <ul className={style.todoList}>
          {filteredTodos.map(todo =>
            <TodoItem currentSelectModeId={settings.selectingPageId} key={todo.id} expanded={this.state.expandedState[todo.id]} todo={todo} {...actions} setSelectingPageId={this.collapseNonSelectPagesAndSet.bind(this)} onToggleExpandedState={this.toggleExpandedState.bind(this)} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}
