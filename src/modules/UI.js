import Coordinator from "./Coordinator.js";
import Storage from "./Storage.js";


export default class UI {

    static initialiseButtons () {
        const addTaskButton = document.getElementById('addTaskBtn');
        const cancelAddTaskButton = document.getElementById('cancelAddTaskBtn')
        const createTaskButton = document.getElementById('createTaskBtn')
        const inboxButton = document.getElementById('inboxIcon');
        const todayButton = document.getElementById('todayIcon');
        const weekButton = document.getElementById('weekIcon');
        const projectButton = document.getElementById('projectIcon');
        const addProjectButton = document.getElementById('addProjectButton');
        const cancelAddProjectButton = document.getElementById('cancelAddProjectBtn');
        const createProjectButton = document.getElementById('createProjectBtn');
        
        addTaskButton.addEventListener('click', UI.openAddTaskPopup);
        cancelAddTaskButton.addEventListener('click', UI.closeAddTaskPopup);
        createTaskButton.addEventListener('click', Coordinator.createTask);
        inboxButton.addEventListener('click', UI.openInboxPage);
        projectButton.addEventListener('click', UI.openProjectPage);
        addProjectButton.addEventListener('click', UI.openAddProjectPopup);
        cancelAddProjectButton.addEventListener('click', UI.closePopup);
        createProjectButton.addEventListener('click', Coordinator.handleCreateProjectButton);

    }

    // Buttons 
    static openAddTaskPopup () {
        const addTaskPopup = document.getElementById('addTaskInput');
        
        addTaskPopup.style.display = 'flex';
    }

    static closeAddTaskPopup () {
        const addTaskPopup = document.getElementById('addTaskInput');

        addTaskPopup.style.display = 'none';
    }

    static copyInputInformation () {
        const taskInputValue = document.getElementById('taskTextInput').value;
        return taskInputValue;
    }

    // Display selected Project

    static openInboxPage () {
        UI.createToDoPage('Inbox');
    }

    static createToDoPage (projectName) {
        UI.changeLayout('toDoList');
        UI.changeProjectTitle(projectName);
        UI.showToDoList(projectName);
    }

    static showToDoList(projectName){;
        UI.resetList();
        const projectToShow = Storage.getProjectList().getProject(projectName);
    
        for (let i=0; i< projectToShow.getTasks().length; i++){
            const taskDiv = UI.createTaskDivs(projectToShow.getTasks()[i]);
            UI.displayTaskDiv(taskDiv);
        }
    }

    static changeProjectTitle(project) {
        const titleDiv = document.getElementById('listTitle');
        titleDiv.textContent = project;
    }

    static getProjectName() {
        const projectName = this.querySelector('p').textContent;

        return projectName;
    }

    static showProject (project) {
        UI.resetList();
        UI.changeLayout('toDoList');
        const projectToShow = Storage.getProjectList().getProject(project);
        
        for (let i=0; i< projectToShow.getTasks().length; i++){
            const taskDiv = UI.createTaskDivs(projectToShow.getTasks()[i]);
            UI.displayTaskDiv(taskDiv);
        }
    }

    static createTaskDivs(task) {
        
        const circle = UI.createCheckCircle();
        const taskContent = UI.createTaskContent(task);
        const deleteButton = UI.createDeleteButton(task);
        const div = document.createElement('div');
        div.classList.add('task');
        div.append(circle,taskContent, deleteButton);

        return div;
         
    }

    static displayTaskDiv(div){
        const listContent = document.getElementById('list');
        listContent.appendChild(div);
    }

    static createCheckCircle(){
        const circle = document.createElement('i');
        circle.classList.add('far', 'fa-circle');
        const circleDiv = UI.embedInDiv(circle, 'taskCheckCircle');

        return circleDiv;
    }

    static createDeleteButton (task) {
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-times', 'deleteIcon');
        const deleteBtn = UI.embedInDiv(deleteIcon, 'taskCancelButton');
        deleteBtn.addEventListener('click', Coordinator.deleteTask);

        return deleteBtn;
    }

    static createTaskContent(task){
        const content = document.createElement('p');
        content.textContent = task.getTitle();

        return content;
    }

    static resetList() {
        const listContent = document.getElementById('list');
        listContent.innerHTML = '';
    }

    // Display Projects

    static openProjectPage() {
        UI.changeLayout('projectList');
        UI.showAllProjects();

    }

    static showAllProjects(){
        UI.clearProjectList();
        const projects = Storage.getProjectList().getProjects();
        console.log(projects);
        const projectListDiv = document.getElementById('projectListDiv');
        for(let i=0; i<projects.length ; i++){
            const projectDiv = UI.createProjectDiv(projects[i]);
            projectDiv.classList.add('projectDiv');
            projectListDiv.appendChild(projectDiv);
        }
    }

    static showProjectToDos () {
        const projectName = this.querySelector('p').textContent;
        UI.createToDoPage(projectName);
    }

    static createProjectDiv (project) {
        const projectTitle = document.createElement('p');
        projectTitle.textContent = project.getName();
        const projectDiv = UI.embedInDiv(projectTitle);
        projectDiv.addEventListener('click', UI.showProjectToDos)

        return projectDiv;
    }

    static openAddProjectPopup() {
        const popup = document.getElementById('addProjectPopup');
        popup.classList.add('activePopup');
        UI.hideAddProjectButton(this); 
    }

    static hideAddProjectButton(button){
       
    }

    static closePopup() {
        const popup = document.getElementById('addProjectPopup');
        popup.classList.remove('activePopup'); 
    }

    static copyInputProjectInformation() {
        const input = document.getElementById('projectNameInput').value;

        return input;
    }

    static clearProjectList() {
        const list = document.getElementById('projectListDiv');
        list.textContent = '';
    }

    static openProject() {
        UI.changeLayout('toDoList');
        UI.showProject(this.querySelector('p').textContent);
    }
    // Layout 

    static changeLayout(layout) {
        const activeLayout = document.querySelectorAll('.activeLayout');
        activeLayout.forEach(div => div.classList.remove('activeLayout'));
        switch (layout){
            case 'toDoList':
                UI.showToDoListLayout();
                break;
            case 'projectList':
                UI.showProjectListLayout();
                break;
        }
    }

    static showToDoListLayout() {
        const toDoLayoutDiv = document.getElementById('toDoLayoutDiv');
        toDoLayoutDiv.classList.add('activeLayout');
    
    
    }

    static showProjectListLayout (){
        const projectLayoutDiv = document.getElementById('projectLayoutDiv');
        projectLayoutDiv.classList.add('activeLayout');
    }
    // Help Functions

    static embedInDiv (element, id) {
        const div = document.createElement('div');
        div.id = id;
        div.appendChild(element);

        return div;
    }
}