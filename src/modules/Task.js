export default class Task {
  constructor(title, dueDate, project, priority) {
    this._title = title;
    this._dueDate = dueDate;
    this._project = project;
    this._priority = priority;
  }

  getTitle() {
    return this._title;
  }

  getDueDate() {
    return this._dueDate;
  }

  getProject() {
    return this._project;
  }

  getPriority() {
    return this._priority;
  }
}
