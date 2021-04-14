import Coordinator from "./Coordinator.js";
import Storage from "./Storage.js";


export default class UI {

    static initialiseButtons () {
        const addTaskButton = document.getElementById('addTaskBtn');
        const cancelAddTaskButton = document.getElementById('cancelAddTaskBtn')
        const createTaskButton = document.getElementById('createTaskBtn')
        const inboxButton = document.getElementById ('inboxIcon');
        const todayButton = document.getElementById ('todayIcon');
        const weekButton = document.getElementById ('weekIcon');
        const projectButton = document.getElementById('projectIcon');
        
        addTaskButton.addEventListener('click', UI.openAddTaskPopup);
        cancelAddTaskButton.addEventListener('click', UI.closeAddTaskPopup);
        createTaskButton.addEventListener('click', Coordinator.createTask);

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
        console.log(taskInputValue)
        return taskInputValue;
    }

    // Display Project

    static showProject (project) {
        UI.resetList();
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
        deleteIcon.classList.add('fas', 'fa-times');
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

    // Help Functions

    static embedInDiv (element, id) {
        const div = document.createElement('div');
        div.id = id;
        div.appendChild(element);

        return div;
    }
}