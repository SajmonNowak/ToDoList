import Task from './Task.js';
import UI from './UI.js';
import ProjectList from './ProjectList.js';
import Storage from './Storage.js'
import Project from './Project.js';

export default class Coordinator {

    static loadPage(){
        UI.initialiseButtons();
        UI.showProject('inbox');
    }
    
    static initialiseFirstStart () {
        const projectList = new ProjectList();
        Coordinator.createInputExamples(projectList);
        Storage.saveToDoList(projectList);
    }

    static createInputExamples(projectList){
        const inbox = projectList.getProject('inbox');
        
        inbox.setTasks(
            [
                new Task('Example1'),
                new Task('Example2'),
                new Task('Example3')
            ]
        )
    }

    static createTask() {
        const task = Coordinator.createNewTask(UI.copyInputInformation());
        UI.closeAddTaskPopup();
        Storage.addTask('inbox', task);
        UI.showProject('inbox');
    }

    static createNewTask(taskInputValue) {
        return new Task (taskInputValue);
    }
    
    static deleteTask(){
        const task = this.parentNode.querySelector('p').textContent;
        const project = 'inbox'; 
        Storage.deleteTask(project, task);
        UI.showProject(project);
    }

    
    
   
}