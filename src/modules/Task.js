export default class Task {
    constructor (title, description, dueDate, priority){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
    }

    getTitle () {
        return this._title
    }

    set title (title) {
        this._title = title;
    }
 
    get description () {
        return this._description;
    }

    set description (description) {
        this._description = description;
    }

    get dueDate () {
        return this._dueDate;
    }

    set dueDate (dueDate) {
        this._dueDate = dueDate;
    }

    get priority() {
        return this._priority;
    }

    set priority(priority) {
        this.priority = priority;
    }
}

