import {projectList} from "./projectlist.js";
import {Project} from "./project.js";
import {showMessage, generateId, showProjectsOnSideBar} from "./utils.js";
// import { ms } from "date-fns/locale";

export function modProjects(items,projects,projectId=""){
    const mainContent = document.querySelector("#main-content");
    const msgDiv = document.querySelector("#status-message");
    let str = `<div id="project-mod">
                    <div id="project-details-div">
                    <p>Project Name (Title):</p><input type="text" id="project-title" title="Enter Project Name">
                    <p>Project Description:</p><textarea id="project-desc" title="Enter a description (optional)"></textarea>
                    <p>Choose a Color:</p><input type="color" id="project-color" value="#ffffff" title="Click to select a color">
                    `
    if(projectId){
        str += `<div id="proj-buttons">
                    <button type="button" id="btn-prj-save">Save</button>
                    <button type="button" id="btn-prj-delete">Delete</button>
                    <button type="button" id="btn-prj-cancel">Cancel</button>
                </div>`
    }else {
        str += `<div id="proj-buttons">
                    <button type="button" id="btn-prj-save">Save</button>
                    <button type="button" id="btn-prj-cancel">Cancel</button>
                </div>`
    }
    str += `</div>
            <div id="item-list-div">
            <select multiple name="item-list" id="item-list" style="width: 30ch">
            </select>
            </table> 
            </div>
        </div>`;
    mainContent.innerHTML = str;
    if(projectId){
        document.querySelector("#heading").innerText = "Edit Project Details";
    }else {
        document.querySelector("#heading").innerText = "Add New Project";
    }
    populateForm(items,projects,projectId);
    document.querySelector("#proj-buttons").addEventListener("click",(e)=>{
        switch (e.target.id){
            case "btn-prj-save":{
                let saved = saveProject(projects,projectId);
                switch(saved){
                    case -2: {
                        showMessage("Unable to save changes, something went wrong!",msgDiv);
                        break;
                    }
                    case -1: {
                        showMessage("Unable to add Project, two projects can't have same name",msgDiv);
                        break;
                    }
                    case 0: {
                        showMessage("Project Saved!",msgDiv);
                        projectId = "";
                        populateForm(items,projects,projectId);
                        showProjectsOnSideBar(projects,document.querySelector("#projects-div"));
                        break;
                    }
                    case 1: {
                        showMessage("Project Title (Name) can not be empty",msgDiv);
                        break;
                    }
                    case 2: {
                        showMessage("Project Description can not be empty",msgDiv);
                        break;
                    }

                }
                break;
            }
            case "btn-prj-delete":{
                if(!window.confirm("Do you really want to delete this project?")){
                    return;
                }
                let deleted = deleteProject(items,projects,projectId);
                switch(deleted) {
                    case -1:{
                        showMessage("Adding project, nothign to delete",msgDiv);
                        break;
                    }
                    case 1:{
                        showMessage("Unable to delete, Todo Items exist for this project?",msgDiv);
                        break;
                    }
                    case 0:{
                        projectList(items,projects);
                        showProjectsOnSideBar(projects,document.querySelector("#projects-div"));
                        break;
                    }
                }
                break;
            }
            case "btn-prj-cancel":{
                projectList(items,projects);
                break;
            }
        }
    })
}

function populateForm(items,projects,projectId){
    let itemsToShow;
    let itemList = document.querySelector("#item-list");
    itemList.style.cursor = "not-allowed";
    itemList.style.fontSize = "0.75rem";
    if(!projectId){
        document.querySelector("#project-title").value = "";
        document.querySelector("#project-desc").value = "";
        document.querySelector("#project-color").value = "#ffffff";
    }else {
        for(let i = 0;i < projects.length;i++){
            if(projects[i].projectId === projectId){
                itemList.style.backgroundColor = projects[i].projectColor;
                document.querySelector("#project-title").value = projects[i].projectTitle;
                document.querySelector("#project-desc").value = projects[i].projectDescription;
                document.querySelector("#project-color").value = projects[i].projectColor;
                itemsToShow = items.filter(item => item.projectId === projectId);
                console.log(items);
                for(let j = 0; j<itemsToShow.length;j++){
                    itemList.innerHTML += `<option>${itemsToShow[j].todoTitle}</option>`;
                }
            }
        }
    }

}

function saveProject(projects,projectId){
    let projTitle = document.querySelector("#project-title").value.trim();
    let projDesc = document.querySelector("#project-desc").value.trim();
    let projColor = document.querySelector("#project-color").value;
    let project;
    if(projTitle.length === 0){
        document.querySelector("#project-title").focus();
        return 1;
    }
    if(projDesc.length === 0){
        document.querySelector("#project-desc").focus();
        return 2;
    }
    if(!projectId){
        if(projects.some(proj=>proj.projectTitle === projTitle)){
            return -1;
        }
        project = new Project(generateId(),projTitle, projDesc, projColor);
        projects.push(project);
        return 0;
    }else {
        for(let i = 0; i < projects.length; i++){
            if(projects[i].projectId === projectId){
                projects[i].projectTitle = projTitle;
                projects[i].projectDescription = projDesc;
                projects[i].projectColor = projColor;
                return 0;
            }
        }
    }
    return - 2;
}

function deleteProject(items,projects,projectId){
    if(!projectId){
        populateForm(items,projects,projectId);
        return -1 ;
    }
    for(let i = 0;i < projects.length;i++){
        if(projects[i].projectId === projectId){
            if(items.some(item=> item.projectId === projectId)){
                return 1;
            }
            projects.splice(i,1);
            return 0;
        }
    }
}