import Coordinator from "./Coordinator.js";
import Storage from "./Storage.js";
import {format} from 'date-fns'; 


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
        const removeToDosButton = document.getElementById('removeToDosBtn');
        const doneItemsButton = document.getElementById('doneIcon');
        
        addTaskButton.addEventListener('click', UI.openAddTaskPopup);
        cancelAddTaskButton.addEventListener('click', UI.closeAddTaskPopup);
        createTaskButton.addEventListener('click', Coordinator.createTask);
        inboxButton.addEventListener('click', UI.openInbox);
        projectButton.addEventListener('click', UI.openProjectPage);
        addProjectButton.addEventListener('click', UI.openAddProjectPopup);
        cancelAddProjectButton.addEventListener('click', UI.closeProjectPopup);
        createProjectButton.addEventListener('click', Coordinator.handleCreateProjectButton);
        removeToDosButton.addEventListener('click', Coordinator.shiftDoneItems)
        doneItemsButton.addEventListener('click', UI.openDoneToDosPage);
        todayButton.addEventListener('click', Coordinator.handleTodayListButton);
        
        window.addEventListener('click', () =>{
            document.getElementById('context-menu').classList.remove('active');
        })
    }

    // ContextMenu

    static openContextMenu (e){      
        var contextElement = document.getElementById('context-menu');

        let menuPosition = UI.getPosition(e);
        contextElement.style.left = menuPosition.x + 'px';
        contextElement.style.top = menuPosition.y +'px';
        

        contextElement.classList.add('active');
    }

    // Display selected Project

    

    static showProject (projectName) {
        const projectToShow = Storage.getProjectList().getProject(projectName);
        UI.changeLayout('toDoList');
        UI.resetInputs(projectName);
        UI.changeProjectTitle(projectName);
        UI.showToDoList(projectToShow);
    }

    static resetInputs(projectName) {
        UI.showAddTaskButton();
        UI.closeAddTaskPopup();
        if(projectName == "Today's Tasks" || projectName == "This Week's Tasks" || projectName == "Done"){
            UI.hideAddTaskButton();
        }

        const titleInput = document.getElementById('taskTextInput');
        titleInput.value = "";
        const dateInput = document.getElementById('dateInput');
        dateInput.value= "";

    }

    static showToDoList(projectToShow){;
        UI.resetList();
    
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

    static createTaskDivs(task) {
        
        const circle = UI.createCircle();
        const taskContent = UI.createTaskInfo(task);
        const deleteButton = UI.createDeleteButton(task);
        const div = document.createElement('div');
        div.classList.add('task');
        div.append(circle,taskContent, deleteButton);
        div.addEventListener('click', Coordinator.handleClickOnTask);
        div.addEventListener('contextmenu', e => {
            e.preventDefault();
            UI.openContextMenu(e);
        })

        return div;
         
    }

    static displayTaskDiv(div){
        const listContent = document.getElementById('list');
        listContent.appendChild(div);
    }

    static createCircle(){
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

    static createTaskInfo(task){
        const title = document.createElement('p');
        title.textContent = task.getTitle();
        const div = document.createElement('div');
        div.append(title);

        if(task.getDueDate() !== "" ){
            const date = document.createElement('p');
            date.textContent = task.getDueDate();
            const dateDiv = UI.embedInDiv(date, 'taskDateDiv');
            div.append(dateDiv);
        }

        return div;
    }

    static resetList() {
        const listContent = document.getElementById('list');
        listContent.innerHTML = '';
    }

    static openAddTaskPopup () {
        const addTaskPopup = document.getElementById('addTaskPopup');
        
        addTaskPopup.style.display = 'flex';
        document.getElementById('addTaskBtn').style.display = 'none';
    }

    static closeAddTaskPopup () {
        const addTaskPopup = document.getElementById('addTaskPopup');

        addTaskPopup.style.display = 'none';
        document.getElementById('addTaskBtn').style.display = 'flex';
        UI.deleteErrorMessage(addTaskPopup);
    }


    static copyTaskInputInformation () {
        const title = document.getElementById('taskTextInput').value;
        const date = format(new Date(document.getElementById('dateInput').value), "dd.MM.yyyy")

        return{
            title,
            date
        }
    }

    static showTaskError () {
        const popUp = document.getElementById('addTaskPopup');
        if (popUp.lastChild.id == 'errorMessageDiv'){
            return;
        }
        const errorMessage = document.createElement('h4');
        errorMessage.textContent = "Task needs a title";
        let errorMessageDiv = UI.embedInDiv(errorMessage, 'errorMessageDiv');
        popUp.appendChild(errorMessageDiv);
    }

    static showAddTaskButton () {
        document.getElementById('addTaskBtn').style.display = "flex";
    }

    static hideAddTaskButton () {
        document.getElementById('addTaskBtn').style.display = "none";
    }

    // Task finished

    static markTaskFinished (taskDiv) {
        taskDiv.classList.add('finished');
        taskDiv.removeChild(taskDiv.querySelector('#taskCheckCircle'));
        taskDiv.prepend(UI.createCheckedCircle());

    }

    static markNotFinished (taskDiv) {
        taskDiv.classList.remove('finished');
        taskDiv.removeChild(taskDiv.querySelector('#taskCheckCircle'));
        taskDiv.prepend(UI.createCircle());
    }

    static createCheckedCircle(){
        const checkedCircle = document.createElement('i');
        checkedCircle.classList.add('far', 'fa-check-circle');
        const circleDiv = UI.embedInDiv(checkedCircle, 'taskCheckCircle');

        return circleDiv;
    }

    // Display Projects

    static openInbox(){
        const project = 'Inbox';
        UI.showProject(project);
    }

    static openDoneToDosPage() {
        const project = 'Done';
        UI.showProject(project);
    }
    static openProjectPage() {
        UI.changeLayout('projectList');
        UI.showAllProjects();

    }

    static showAllProjects(){
        UI.clearProjectList();
        const projects = Storage.getProjectList().getProjects();
        const projectListDiv = document.getElementById('projectListDiv');
        for(let i=0; i<projects.length ; i++){
            const projectDiv = UI.createProjectDiv(projects[i]);
            projectDiv.classList.add('projectDiv');
            projectListDiv.appendChild(projectDiv);
        }
    }

    static showProjectToDos () {
        const projectName = this.querySelector('p').textContent;
        UI.showProject(projectName);
    }

    static createProjectDiv (project) {
        const projectTitle = document.createElement('p');
        projectTitle.textContent = project.getName();
        const projectDiv = UI.embedInDiv(projectTitle);
        projectDiv.addEventListener('click', UI.showProjectToDos)
        projectDiv.addEventListener('contextmenu', e => {
            e.preventDefault();
            UI.openContextMenu(e);
        })

        return projectDiv;
    }

    static openAddProjectPopup() {
        const popup = document.getElementById('addProjectPopup');
        popup.classList.add('activePopup');
        document.getElementById('addProjectButton').style.display = 'none';
    }


    static closeProjectPopup() {
        const popup = document.getElementById('addProjectPopup');
        popup.classList.remove('activePopup'); 
        document.getElementById('addProjectButton').style.display = 'flex';
        UI.deleteErrorMessage(popup);
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
        UI.showToDoList(this.querySelector('p').textContent);
    }

    static showProjectError () {
        const popUp = document.getElementById('addProjectPopup');
        if (popUp.lastChild.id == 'errorMessageDiv'){
            return;
        }
        const errorMessage = document.createElement('h4');
        errorMessage.textContent = "Project needs a title";
        let errorMessageDiv = UI.embedInDiv(errorMessage, 'errorMessageDiv');
        popUp.appendChild(errorMessageDiv);
    }

    static deleteErrorMessage(element) {
        if(element.lastChild.id == 'errorMessageDiv'){
            element.removeChild(element.lastChild);
        }
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

    static getPosition(e) {
        let posx = 0;
        let posy = 0;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
            } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + 
                                document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + 
                                document.documentElement.scrollTop;
        }
        
        return {
        x: posx,
        y: posy
        }
    }
}