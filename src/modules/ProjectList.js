import Project from './Project.js';

export default class ProjectList {
    constructor() { 
        this._projects = [];
        this._projects.push(new Project('inbox'));
    } 

    setProjects (projects){
        this._projects = projects;
    }

    getProjects (){
        return this._projects;
    }

    getProject (projectName){
        return this.getProjects().find(
            project => project.getName() == projectName
        );
    }

    addProject(project){
        this._projects.push(project);
    }
}
