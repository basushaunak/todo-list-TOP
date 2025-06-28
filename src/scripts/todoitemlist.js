import {setPadding,getOppositeColorRGB, writeData, removeData, showError} from "./utils.js";

export function todoItemList(items,projects,filtered = true){
  const msgDiv = document.querySelector("#status-message");
  const mainContent = document.querySelector("#main-content");
  document.querySelector("#heading").innerText = "List of TODO Items";
  mainContent.innerHTML = `<div id="item-list-div">
                            <select multiple id="item-list">
                            </select>
                          </div>`;
  if(items.length === 0){
    // mainContent.innerHTML = "";
    document.querySelector("#item-list-div").style.display = "none";
    showError("There are no Todo-Items",msgDiv);
    return -1;
  }
  let tempStr = ``;
  let tmpBGColor;
  let tmpFGColor;
  let projTitle;
  for(let i = 0;i<items.length;i++){
    for(let j=0;j<projects.length;j++){
      if(projects[j].projectId === items[i].projectId){
        projTitle = setPadding(projects[j].projectTitle,15," ");
        tmpBGColor = projects[j].projectColor;
        tmpFGColor = getOppositeColorRGB(projects[j].projectColor);
        break;
      }
    }
    tempStr = `<option id = "${items[i].todoId}" name = "${items[i].todoId}">`;
    //tempStr = `<option id = "${items[i].todoId}" name = "${items[i].todoId}" style="background-color: ${tmpBGColor}; color: ${tmpFGColor}">`;
    tempStr += `: ${items[i].todoDueDate}`;
    tempStr += setPadding(items[i].todoTitle,20," ");
    tempStr += `: ${setPadding(projTitle,15," ")}`;
    tempStr += `: ${setPadding(items[i].todoDescription,30,0)}`;
    tempStr = `</option>`
    mainContent.innerHTML += tempStr;
    document.querySelector(`"#{items[i].todoId}`).style.color = tmpFGColor;
    document.querySelector(`"#{items[i].todoId}`).style.backgroundColor = tmpBGColor;
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
