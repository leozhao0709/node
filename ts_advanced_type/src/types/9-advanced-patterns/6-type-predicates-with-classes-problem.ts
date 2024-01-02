export class Task<T> {
  counter?: number;
  public tasks: T;
  private countTasks;

  constructor(tasks: T, countTasks: (details: T) => number | void) {
    this.tasks = tasks;
    this.countTasks = countTasks;
  }

  check() {
    const countResult = this.countTasks(this.tasks);

    if (typeof countResult == "number") {
      this.counter = countResult;
      return true;
    }

    this.counter = undefined;
    return false;
  }
}

const task = new Task(["task1", "task2", "task3"], (tasks) => {
  if (tasks.length > 0) {
    return tasks.length - 1;
  }
});

if (task.check()) {
  type test = typeof task.counter;
} else {
  type test = typeof task.counter;
}
