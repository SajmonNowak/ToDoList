import Task from './Task.js';
import UI from './UI.js';
import ProjectList from './ProjectList.js';
import Storage from './Storage.js'
import Project from './Project.js';
import {format,isSameDay, isBefore, addWeeks, isWithinInterval} from 'date-fns'

export default class Coordinator {

    static loadPage(){
        UI.initialiseButtons();
        Coordinator.initialiseProjects();
        UI.showProject('Inbox');
    }
    
    static createInputExamples(projectList){
        const inbox = projectList.getProject('Inbox');
        
        inbox.setTasks(
            [
                new Task('Example1', new Date()),
                new Task('Example2', new Date()),
                new Task('Example3', new Date())
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
        const todayList =  projectList.getProject("Today's Tasks");
        let todaysTasks = [];
        todayList.clear();

        for(let i=0; i<projectList.getProjects().length; i++){
            if (
                projectList.getProjects()[i].getName() !== "Today's Tasks" ||
                projectList.getProjects()[i].getName() !== "Week's Tasks"  ||
                projectList.getProjects()[i].getName() !== "Done"
            ) {            
                const taskArray = projectList.getProjects()[i].getTasks().filter(task => isSameDay(new Date(task.getDueDate()), new Date()))
                for(let i=0; i< taskArray.length; i++) {
                    todaysTasks.push(taskArray[i])
                };
            }
        }

        for (let i=0; i<todaysTasks.length; i++){
            todayList.addTask(todaysTasks[i]);
        }

        Storage.saveProjectList(projectList);
        UI.showProject("Today's Tasks");
    }

    static handleWeekListButton () {
        const projectList = Storage.getProjectList();
        const weekList =  projectList.getProject("Week's Tasks");
        const weekTasks = [];
        weekList.clear();

        for(let i=0; i<projectList.getProjects().length; i++){
            if (
                projectList.getProjects()[i].getName() !== "Today's Tasks" ||
                projectList.getProjects()[i].getName() !== "Week's Tasks"  ||
                projectList.getProjects()[i].getName() !== "Done"
            ) {
                const taskArray = projectList.getProjects()[i].getTasks().filter(
                    task => isWithinInterval(
                        new Date(task.getDueDate()),
                        {start: new Date(), end: addWeeks(new Date(), 1)}
                    )
                );
                for (let i=0; i<taskArray.length; i++){
                    weekTasks.push(taskArray[i]);
                }
            }
        }
        
        for (let i=0; i<weekTasks.length; i++){
            weekList.addTask(weekTasks[i]);
        }

        Storage.saveProjectList(projectList);
        UI.showProject("Week's Tasks");
    }

    static handleCreateProjectButton () {
        const projectName = UI.copyInputProjectInformation().title;

        if(projectName == ""){
            UI.showProjectError();
            return;
        }

        const project = Coordinator.createNewProject(UI.copyInputProjectInformation());
        UI.closeProjectPopup();
        UI.showAllProjects();
    }
    
   static createNewProject(input) {
        const project = new Project (input.title, input.color);
        Storage.addProject(project);
        return project;
   }

   static handleClickOnTask(){
        UI.markTaskFinished(this);
        setTimeout(() => {Coordinator.shiftTask(this)}, 1500);
    }

    static shiftDoneItems () {
        const openProjectName = document.getElementById('listTitle').textContent;
        Coordinator.shiftTaskToProject(openProjectName);
        UI.showProject(openProjectName);
    }

    static shiftTask(task) {
        const taskName = task.querySelector('p').textContent;
        const openProjectName = document.getElementById('listTitle').textContent;
        const openProject = Storage.getProjectList().getProject(openProjectName);

        Storage.addTask("Done", openProject.getTask(taskName));
        Storage.deleteTask(openProjectName, openProject.getTask(taskName));
        UI.showProject(openProjectName);
    }
}