import * as React from 'react';
import { Todo } from 'src/components/todo';
import { TodoListStore } from '../store/TodoListStore';
import { inject } from 'mobx-react';

interface TodoListProps extends React.HtmlHTMLAttributes<{}> {
    todoListStore?: TodoListStore;
}

interface TodoListState {
}

@inject("todoListStore")
export class TodoList extends React.Component<TodoListProps, TodoListState> {

    state: TodoListState = {
    };

    render() {
        return (
            <div>
                {this.props.todoListStore!.todoList.map(todo => {
                    return <div key={todo.id}
                        onClick={() => {
                            this.props.todoListStore!.toggleTodoStatus(todo.id)
                        }}>
                        <Todo
                            todoId={todo.id}
                            content={todo.content}
                            finished={todo.finished}
                        />
                    </div>
                })}
            </div>
        );
    }
}
