import Project from './Project.js';

export default class ProjectList {
    constructor() { 
        this._projects = [];
        this._projects.push(new Project("Inbox"));
        this._projects.push(new Project("Done"));
        this._projects.push(new Project("Today's Tasks"));
        this._projects.push(new Project("Week's Tasks"));
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

    deleteProject(projectName){
        console.log(this.getProjects());
        const projectIndex = this.getProjects().findIndex(element => element.getName() == projectName)
        this.getProjects().splice(projectIndex, 1);
    }
}
