import Task from './Task.js';
import UI from './UI.js';
import ProjectList from './ProjectList.js';
import Storage from './Storage.js'
import Project from './Project.js';

export default class Coordinator {

    static loadPage(){
        UI.initialiseButtons();
        // UI.changeLayout('toDoList');
        Coordinator.initialiseProjects();
        UI.showProject('Inbox');
    }
    
    static createInputExamples(projectList){
        const inbox = projectList.getProject('Inbox');
        
        inbox.setTasks(
            [
                new Task('Example1'),
                new Task('Example2'),
                new Task('Example3')
            ]
        )
    }

    static initialiseProjects() {
        if (localStorage.length == 0){
        const projectList = new ProjectList();
        Coordinator.createInputExamples(projectList);
        Storage.saveProjectList(projectList);
        }
    }

    static createTask() {
        const task = Coordinator.createNewTask(UI.copyInputInformation());
        const projectName = this.closest('#toDoLayoutDiv').querySelector('#listTitle').textContent;
        
        UI.closeAddTaskPopup();
        Storage.addTask(projectName, task);
        UI.showToDoList(projectName);
    }

    static createNewTask(taskInputValue) {
        return new Task (taskInputValue);
    }
    
    static deleteTask(){
        const task = this.parentNode.querySelector('p').textContent;
        const projectName = this.closest('main').querySelector('#listTitle').textContent;
        Storage.deleteTask(projectName, task);
        UI.showProject(projectName);
    }

    static handleCreateProjectButton () {
        const project = Coordinator.createNewProject(UI.copyInputProjectInformation());
        UI.closePopup();
        UI.showAllProjects();
    }
    
   static createNewProject(name) {
        const project = new Project (name);
        Storage.addProject(project);
        return project;

   }
}