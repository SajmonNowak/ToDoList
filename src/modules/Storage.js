import ProjectList from "./ProjectList.js";
import Project from "./Project.js";
import Task from "./Task.js";

export default class Storage {
  static getProjectList() {
    const projectList = Object.assign(
      new ProjectList(),
      JSON.parse(localStorage.getItem("savedList"))
    );

    projectList.setProjects(
      projectList.getProjects().map((p) => Object.assign(new Project(), p))
    );

    projectList
      .getProjects()
      .forEach((p) =>
        p.setTasks(p.getTasks().map((task) => Object.assign(new Task(), task)))
      );
    return projectList;
  }

  static saveProjectList(list) {
    localStorage.setItem("savedList", JSON.stringify(list));
  }

  static addTask(projectName, task) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).addTask(task);
    Storage.saveProjectList(projectList);
  }

  static deleteTask(projectName, taskTitle) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).deleteTask(taskTitle);
    Storage.saveProjectList(projectList);
  }

  static addProject(project) {
    const projectList = Storage.getProjectList();
    projectList.addProject(project);
    Storage.saveProjectList(projectList);
  }

  static deleteProject(projectName) {
    const projectList = Storage.getProjectList();
    projectList.deleteProject(projectName);
    Storage.saveProjectList(projectList);
  }
}
