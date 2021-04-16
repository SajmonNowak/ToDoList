import ProjectList from "./ProjectList.js";
import Project from "./Project.js";
import Task from "./Task.js";


export default class Storage {

    static getProjectList (){

        const projectList = Object.assign(
            new ProjectList(), JSON.parse(localStorage.getItem('savedList'))
        );

        projectList.setProjects(
            projectList
            .getProjects()
            .map((p) => Object.assign(new Project(), p))
        );

        projectList
        .getProjects()
        .forEach((p) =>
            p.setTasks(
                p.getTasks().map((task) => Object.assign(new Task(), task))
            )
        );
        return projectList;
    }

    static saveProjectList(list) {
        localStorage.setItem('savedList',JSON.stringify(list));
    }

    static addTask (project, task) {
        const projectList = Storage.getProjectList();
        projectList.getProject(project).addTask(task);
        Storage.saveProjectList(projectList);
    }

    static deleteTask (project, taskTitle) {
        const projectList = Storage.getProjectList();
        projectList.getProject(project).deleteTask(taskTitle);
        Storage.saveProjectList(projectList);
    }

    static addProject (project){
        const projectList = Storage.getProjectList();
        projectList.addProject(project);
        Storage.saveProjectList(projectList);
    }
}