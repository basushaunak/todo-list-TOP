import "../css/projectlist-styles.css";
import { modProjects } from "./modprojects.js";
import {showMessage, getTextColor,hexToRGB} from "./utils.js";

export function projectList(items,projects){
    let msgDiv = document.querySelector("#status-message");
    if(projects.length === 0){
        showMessage("There are no projects.",msgDiv);
    }
    document.querySelector("#heading").innerText = "List of Projects";
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = `<div id="project-list-div">
                          <table id="project-list-table">
                            <tr>
                                <th style="width: 12ch">Color</th>
                                <th style="width: 25ch">Project Title</th>
                                <th style="width: 35ch">Description</th>
                              </tr>
                            </table> 
                          </div>`;
    const projectList = document.querySelector("#project-list-table");
    projectList.style.cursor = "cell";
    projectList.style.userSelect = "none";
    projectList.style.borderSpacing = "0.25rem";
    document.querySelector("#project-list-div").addEventListener("dblclick",(e)=>{
    let closestRow = e.target.closest("tr");
    if(closestRow && closestRow.id){
        modProjects(items,projects,closestRow.id.slice(1));
    }
    });


    if(projects.length === 0){
        document.querySelector("#project-list-div").style.display = "none";
        showMessage("There are no Projects",msgDiv);
        return -1;
    }
    let tempStr = ``;
    let tmpFGColor;
    for(let i = 0;i<projects.length;i++){
    tempStr = ``;
    tmpFGColor = getTextColor(hexToRGB(projects[i].projectColor));
    tempStr = `<tr id="P${projects[i].projectId}">`;
    tempStr += `<td style="background-color:${projects[i].projectColor}; color:${tmpFGColor}">${projects[i].projectColor}</td>`;
    tempStr += `<td>${projects[i].projectTitle}</td>`;
    tempStr += `<td>${projects[i].projectDescription}</td>`;
    tempStr += `</tr>`;
    projectList.innerHTML += tempStr;
    }
}