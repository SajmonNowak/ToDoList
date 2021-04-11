
export default class Project {
    constructor (name) {
        this._name = name;
        this._tasks = [];
    }

    setName(name) {
        this._name = name;
    }

    getName () {
        return this._name;
    }

    setTasks(tasks){
        this._tasks = tasks;
    }

    getTasks() {
        return this._tasks;
    }

    addTask(task) {
        this._tasks.push(task);
    }

}