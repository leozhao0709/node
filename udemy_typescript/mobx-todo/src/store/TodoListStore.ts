import { computed, observable, action } from 'mobx';

export interface TodoObj {
    id: number;
    content: string;
    finished: boolean;
}

export class TodoListStore {
    @observable
    public todoList: TodoObj[];

    @computed get unfinishedTodoList() {
        return this.todoList.filter(todo => !todo.finished)
    }

    constructor(todoList: TodoObj[]) {
        this.todoList = todoList
    }

    @action addTodo() {
        this.todoList.push({
            id: this.todoList.length,
            content: "New Todo",
            finished: false
        })
    }

    @action toggleTodoStatus(id: number) {
        this.todoList[id].finished = !this.todoList[id].finished
    }
}