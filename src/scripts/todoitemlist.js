import { modTodoItems } from "./modtodoitems.js";
import {setPadding,getOppositeColorRGB, hexToRGB, writeData, removeData, showError} from "./utils.js";

export function todoItemList(items,projects,filtered = true){
  const msgDiv = document.querySelector("#status-message");
  const mainContent = document.querySelector("#main-content");
  document.querySelector("#heading").innerText = "List of TODO Items";
  mainContent.innerHTML = `<div id="item-list-div">
                          <table id="item-list-table">
                            <tr>
                                <th style="width: 12ch">Due Date</th>
                                <th style="width: 25ch">TODO Title</th>
                                <th style="width: 25ch">Project</th>
                                <th style="width: 35ch">Description</th>
                              </tr>
                            </table> 
                          </div>`;
  document.querySelector("#item-list-div").style.height = "100%";
  document.querySelector("#item-list-div").style.width = "95%";
  document.querySelector("#item-list-div").style.overflow = "scroll";
  const itemList = document.querySelector("#item-list-table");
  itemList.style.cursor = "cell";
  itemList.style.userSelect = "none";
  itemList.style.borderSpacing = "0.25rem";
  document.querySelector("#item-list-div").addEventListener("dblclick",(e)=>{
    let closestRow = e.target.closest("tr");
    if(closestRow && closestRow.id){
      modTodoItems(items,projects,closestRow.id.slice(1));
    }
  })
  if(items.length === 0){
    document.querySelector("#item-list-div").style.display = "none";
    showError("There are no Todo-Items",msgDiv);
    return -1;
  }
  let tempStr = ``;
  let tmpBGColor;
  let tmpFGColor;
  let projTitle;
  
  for(let i = 0;i<items.length;i++){
    tempStr = ``;
    for(let j=0;j<projects.length;j++){
      if(projects[j].projectId === items[i].projectId){
        projTitle = setPadding(projects[j].projectTitle,15," ");
        tmpBGColor = projects[j].projectColor;
        tmpFGColor = getOppositeColorRGB(hexToRGB(projects[j].projectColor));
        console.log(tmpBGColor);
        break;
      }
    }
    tempStr = `<tr id="T${items[i].todoId}">`;
    tempStr += `<td>${items[i].todoDueDate}</td>`;
    tempStr += `<td>${items[i].todoTitle}</td>`;
    tempStr += `<td>${projTitle}</td>`;
    tempStr += `<td>${items[i].todoDescription}</td>`;
    tempStr += `</tr>`;
    itemList.innerHTML += tempStr;
    document.querySelector(`#T${items[i].todoId}`).style.color = tmpFGColor;
    document.querySelector(`#T${items[i].todoId}`).style.backgroundColor = tmpBGColor;
  }
  if(!filtered){
    document.querySelector("#item-list-div").innerHTML += `<div id="buttons"><button type="button" id="btn-save-data">Save</button><button type="button" id="btn-remove-data">Remove</button></div>`
    document.querySelector("#buttons").style.marginBlockStart = "1rem";
    document.querySelector("#buttons").style.display = "grid";
    document.querySelector("#buttons").style.gridTemplateColumns = "1fr 1fr";
    document.querySelector("#btn-save-data").style.width = "9em";
    document.querySelector("#btn-save-data").addEventListener("click",()=>{
      writeData("todoItems",items);
      writeData("projects",projects);
    })
    document.querySelector("#btn-remove-data").addEventListener("click",()=>{
      if(!removeData("todoItems")){
        showError("Unable to delete Todo-Items, local storage available ?",msgDiv)
      }
      if(!removeData("projects")){
        showError("Unable to delete Projects, local storage available ?",msgDiv)
      }
    })
  }
}
