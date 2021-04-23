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
                new Task('Example1', '16.05.2021'),
                new Task('Example2', '29.05.2021'),
                new Task('Example3', '3.08.2021')
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
        const userTaskInput = UI.copyTaskInputInformation();

        if(userTaskInput.title == ""){
            UI.showTaskError();
            return;
        }
        
        const task = Coordinator.createNewTask(userTaskInput);
        const projectName = this.closest('#toDoLayoutDiv').querySelector('#listTitle').textContent;
        
        UI.closeAddTaskPopup();
        Storage.addTask(projectName, task);
        UI.showProject(projectName);
    }

    static createNewTask(input) {
        return new Task (input.title, input.date);
    }
    
    static deleteTask(){
        const task = this.parentNode.querySelector('p').textContent;
        const projectName = this.closest('main').querySelector('#listTitle').textContent;
        Storage.deleteTask(projectName, task);
        UI.showProject(projectName);
    }

    static handleTodayListButton() {
        const projectList = Storage.getProjectList();
        const inbox = projectList.getProject('Inbox'); 
        const todayList =  projectList.getProject("Today's Tasks");
        todayList.clear();
        console.log(todayList);

        const todaysTasks = inbox.getTasks().filter(task => task.getDueDate() == '23.04.2021');
        for (let i=0; i<todaysTasks.length; i++){
            todayList.addTask(todaysTasks[i]);
        }

        Storage.saveProjectList(projectList);
        UI.showProject("Today's Tasks");
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
            Storage.addTask("Done", openProject.getTask(taskName));
            Storage.deleteTask(openProjectName, openProject.getTask(taskName));
        }

    }

}