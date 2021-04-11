import ProjectList from "./ProjectList.js";
import Project from "./Project.js";
import Task from "./Task.js";


export default class Storage {

    static getProjectList (){

        console.log(JSON.parse(localStorage.getItem('savedList')));
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
}