
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

    deleteTask(task) {
        const taskIndex = this.getTasks().findIndex(element => element.getTitle() == task);
        console.log(taskIndex);
        this.getTasks().splice(taskIndex, 1);
    }

}