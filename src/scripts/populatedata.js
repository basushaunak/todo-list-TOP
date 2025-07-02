import {TodoItem} from "./todoitem.js";
import {generateId} from "./utils.js";
import {Project} from "./project.js";

export function populateData(items,projects){
    //
    let project = new Project(generateId(),"Buy","Buy - todo");
    project.projectColor = "#f274bd";
    projects.push(project);
    project = new Project(generateId(),"Sell","Sell - todo");
    project.projectColor = "#50fa7b";
    projects.push(project);
    project = new Project(generateId(),"Gardening","Gardening - todo");
    project.projectColor = "#80d4e7";   
    projects.push(project);
    project = new Project(generateId(),"Studying","Studying - todo");
    project.projectColor = "#ff5555";
    projects.push(project);
    project = new Project(generateId(),"Vacation","Vacation - todo");
    project.projectColor = "#282a36";
    projects.push(project);
    project = new Project(generateId(),"TOP","TOP Course Planner - todo");
    project.projectColor = "#6272a4";
    projects.push(project);
    //
    let item = new TodoItem(generateId(),"Buy","Buy Item 1");
    items.push(item);


}