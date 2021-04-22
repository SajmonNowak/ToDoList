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
        const taskName = UI.copyTaskInputInformation();

        if(taskName == ""){
            UI.showTaskError();
            return;
        }
        
        const task = Coordinator.createNewTask(taskName);
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
        const projectName = UI.copyInputProjectInformation();

        if(projectName == ""){
            UI.showProjectError();
            return;
        }

        const project = Coordinator.createNewProject(projectName);
        UI.closeProjectPopup();
        UI.showAllProjects();
    }
    
   static createNewProject(name) {
        const project = new Project (name);
        Storage.addProject(project);
        return project;
   }

   static handleClickOnTask(){
        if (this.classList.contains('finished')){
            UI.markNotFinished(this);
            return;
        }
        UI.markTaskFinished(this);
    }

    static shiftDoneItems () {
        // const project = Coordinator.getCurrentProject();
        const openProjectName = document.getElementById('listTitle').textContent;
        Coordinator.shiftTaskToProject(openProjectName);
        UI.showProject(openProjectName);
    }

    static shiftTaskToProject(openProjectName, task) {
        const openProject = Storage.getProjectList().getProject(openProjectName);
        const finishedTasks = document.querySelectorAll('.finished');

        for (let i = 0; i<finishedTasks.length; i++){
            const taskName = finishedTasks[i].querySelector('p').textContent;
            Storage.addTask("Done ToDo's", openProject.getTask(taskName));
            Storage.deleteTask(openProjectName, openProject.getTask(taskName));
        }

    }

}