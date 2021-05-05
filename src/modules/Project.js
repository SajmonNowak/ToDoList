export default class Project {
  constructor(name, color) {
    this._name = name;
    this._tasks = [];
    this._color = color;
  }

  setName(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  getTasks() {
    return this._tasks;
  }

  getTask(taskName) {
    return this.getTasks().find((element) => element.getTitle() == taskName);
  }

  addTask(task) {
    this._tasks.push(task);
  }

  deleteTask(task) {
    const taskIndex = this.getTasks().findIndex(
      (element) => element.getTitle() == task
    );
    this.getTasks().splice(taskIndex, 1);
  }

  getColor() {
    return this._color;
  }

  setColor(color) {
    this._color = color;
  }

  clear() {
    this._tasks = [];
  }
}
