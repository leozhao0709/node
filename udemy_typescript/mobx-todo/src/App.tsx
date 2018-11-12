import * as React from 'react';
import './App.css';
import { TodoList } from './container/TodoList';
import { TodoListStore } from './store/TodoListStore';
import { observer, Provider } from 'mobx-react';

const todoListStore = new TodoListStore([{
  content: "hahah",
  finished: true,
  id: 0,
}]);

@observer
class App extends React.Component {

  addTodo = () => {
    todoListStore.addTodo()
  }

  public render() {
    return (
      <Provider todoListStore={todoListStore}>
        <div className="App">
          <button onClick={() => this.addTodo()}>Add Todo</button>
          <TodoList />
          {todoListStore.unfinishedTodoList.length ? <p>You have things to do!</p> : <p> all finished!</p>}
        </div>
      </Provider>
    );
  }
}

export default App;
