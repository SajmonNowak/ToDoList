import Coordinator from "./Coordinator.js";
import Storage from "./Storage.js";
import {format, isBefore, startOfDay} from 'date-fns'; 


export default class UI {

    static initialiseButtons () {
        const addTaskButton = document.getElementById('addTaskBtn');
        const cancelAddTaskButton = document.getElementById('cancelAddTaskBtn')
        const createTaskButton = document.getElementById('createTaskBtn')
        const inboxButton = document.getElementById('inboxIcon');
        const todayButton = document.getElementById('todayIcon');
        const weekButton = document.getElementById('weekIcon');
        const projectInputButton = document.getElementById('projectInputField')
        const projectButton = document.getElementById('projectIcon');
        const addProjectButton = document.getElementById('addProjectButton');
        const cancelAddProjectButton = document.getElementById('cancelAddProjectBtn');
        const createProjectButton = document.getElementById('createProjectBtn');
        const doneItemsButton = document.getElementById('doneIcon');
        const priorityInputDiv = document.getElementById('priorityInputDiv')
        const deleteButton = document.getElementById('rightClickDelete');
        
        addTaskButton.addEventListener('click', UI.openAddTaskPopup);
        cancelAddTaskButton.addEventListener('click', UI.resetTaskInputs);
        createTaskButton.addEventListener('click', Coordinator.createTask);
        inboxButton.addEventListener('click', UI.openInbox);
        projectInputButton.addEventListener('click', UI.openProjectInput)
        projectButton.addEventListener('click', UI.openProjectPage);
        addProjectButton.addEventListener('click', UI.openAddProjectPopup);
        cancelAddProjectButton.addEventListener('click', UI.closeProjectPopup);
        createProjectButton.addEventListener('click', Coordinator.handleCreateProjectButton);
        doneItemsButton.addEventListener('click', UI.openDoneToDosPage);
        todayButton.addEventListener('click', Coordinator.handleTodayListButton);
        weekButton.addEventListener('click', Coordinator.handleWeekListButton);
        priorityInputDiv.addEventListener('click', UI.addStarIcon);
        deleteButton.addEventListener('click', Coordinator.deleteTask);
        
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
        UI.resetTaskInputs(projectName);
        UI.changeProjectTitle(projectName);
        UI.showToDoList(projectToShow);
    }

    static resetTaskInputs(projectName) {
        UI.showAddTaskButton();
        UI.closeAddTaskPopup();
        if(projectName == "Today's Tasks" || projectName == "Week's Tasks" || projectName == "Done"){
            UI.hideAddTaskButton();
        }

        const titleInput = document.getElementById('taskTextInput');
        titleInput.value = "";
        const dateInput = document.getElementById('dateInput');
        dateInput.value= "";
        const projectInput = document.getElementById('projectSelectList');
        const projectOptions = document.querySelectorAll('.projectOption');
        for (let i=0; i<projectOptions.length; i++){
            projectInput.removeChild(projectOptions[i]);
        }

    }

    static showToDoList(projectToShow){;
        UI.resetList();
        const sortedProject = Coordinator.sortProject(projectToShow);
        for (let i=0; i< projectToShow.getTasks().length; i++){
            const taskDiv = UI.createTaskDivs(sortedProject[i]);
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
        const starDiv = UI.createStarDiv(task);
        const div = document.createElement('div');
        div.classList.add('task');
        div.append(circle,taskContent, starDiv, deleteButton);
        div.addEventListener('click', Coordinator.handleClickOnTask);
        div.addEventListener('contextmenu', e => {
            e.preventDefault();
            UI.openContextMenu(e);
        })

        if (isBefore(new Date(task.getDueDate()), startOfDay(new Date()))){
            div.classList.add('dueTask');
        }

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

        if(task.getDueDate() !== 'No dueDate' ){
            const date = document.createElement('p');
            date.textContent = format(new Date(task.getDueDate()), "dd.MM.yyy");
            const dateDiv = UI.embedInDiv(date, 'taskDateDiv');
            div.append(dateDiv);
        }

        return div;
    }

    static createStarDiv (task) {
        const priorityDiv = document.createElement('div');
        priorityDiv.classList.add('taskPriorityInfo');
        for (let i=0; i<task.getPriority(); i++){
            const star = document.createElement('i');
            star.classList.add('fas', 'fa-star', 'taskInfoStar');
            priorityDiv.appendChild(star);
        }
        
        return priorityDiv;
    }
    
    static resetList() {
        const listContent = document.getElementById('list');
        listContent.innerHTML = '';
    }

    static openAddTaskPopup () {
        const addTaskPopup = document.getElementById('addTaskPopup');
        
        addTaskPopup.style.display = 'flex';
        document.getElementById('addTaskBtn').style.display = 'none';
        UI.generateSelectProjects();
    }

    static closeAddTaskPopup () {
        const addTaskPopup = document.getElementById('addTaskPopup');

        addTaskPopup.style.display = 'none';
        document.getElementById('addTaskBtn').style.display = 'flex';
        UI.deleteErrorMessage(addTaskPopup);
    }


    static copyTaskInputInformation () {
        const title = document.getElementById('taskTextInput').value;

        const dateInput = document.getElementById('dateInput').value;
        let date = 'No dueDate'
        if (dateInput !== ""){
            date = new Date(document.getElementById('dateInput').value);
        }

        let project = document.getElementById('projectSelectList').value;
        if (project == "noProject" || project == ""){
            project = "Inbox";
        }

        const priority = document.querySelectorAll('.activeStar').length;
        
        return{
            title,
            date,
            project,
            priority
        }
    }

    static generateSelectProjects() {
        const projects = Storage.getProjectList().getProjects();
        const selectList = document.getElementById('projectSelectList');
        const notOptions = ["Done", "Today's Tasks", "Week's Tasks", "Inbox"]


        for (let i=0; i<projects.length; i++){
            if(!(notOptions.includes(projects[i].getName()))){
                let option = document.createElement('option');
                option.value = projects[i].getName();
                option.text = projects[i].getName();
                option.classList.add('projectOption');
                selectList.appendChild(option);
            }
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

    static addStarIcon() {
        const priorityDiv = document.getElementById('priorityInputDiv');

        const activeStars = priorityDiv.querySelectorAll('.activeStar');
        switch(activeStars.length) {
            
            case 0:
            const star1 = priorityDiv.querySelector('#star1');
            star1.classList.add('activeStar');
            break;
            case 1:
            const star2 = priorityDiv.querySelector('#star2');
            star2.classList.add('activeStar');
            break;
            case 2:
            const star3 = priorityDiv.querySelector('#star3');
            star3.classList.add('activeStar');
            break;
            case 3: 
            for (let i=0; i<3; i++){
                activeStars[i].classList.remove('activeStar');
            }
            break;
        }

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
        UI.resetProjectInputs();

    }

    static showAllProjects(){
        let notShowArray = ["Inbox", "Done", "Week's Tasks", "Today's Tasks"];
        UI.clearProjectList();
        const projects = Storage.getProjectList().getProjects();
        const projectListDiv = document.getElementById('projectListDiv');
        for(let i=0; i<projects.length ; i++){
            if(!(notShowArray.includes(projects[i].getName()))){
                const projectDiv = UI.createProjectDiv(projects[i]);
                projectListDiv.appendChild(projectDiv);
            }
        }
    }

    static showProjectToDos () {
        const projectName = this.querySelector('p').textContent;
        UI.showProject(projectName);
    }

    static createProjectDiv (project) {
        const input = UI.createProjectInformation(project);
        const projectDiv = document.createElement('div');
        projectDiv.append (input.colorCircle, input.projectTitle);
        projectDiv.classList.add('projectDiv');
        projectDiv.addEventListener('click', UI.showProjectToDos)
        projectDiv.addEventListener('contextmenu', e => {
            e.preventDefault();
            UI.openContextMenu(e);
        })

        return projectDiv;
    }

    static createProjectInformation(project) {
        const projectTitle = document.createElement('p');
        projectTitle.textContent = project.getName();
        const colorCircle = document.createElement('i');
        colorCircle.classList.add('fas', 'fa-circle');
        colorCircle.style.color = project.getColor();

        return{
            projectTitle,
            colorCircle,
        }

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
        const title = document.getElementById('projectNameInput').value;
        const color = document.getElementById('colorOption').value;

        return{
            title,
            color
        }
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

    static resetProjectInputs() {
        document.getElementById('projectNameInput').value = '';
        document.getElementById('colorOption').value = '';
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