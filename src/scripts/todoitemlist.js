import { modTodoItems } from "./modtodoitems.js";
import {hexToRGB, writeData, removeData, showMessage, getTextColor} from "./utils.js";
import "../css/todoitemlist-styles.css";

export function todoItemList(items,projects,filter = false){
  document.querySelector("#details").innerHTML = `<div id="heading"></div>
              <div id="main-content">
              </div>`;
  const msgDiv = document.querySelector("#status-message");
  const mainContent = document.querySelector("#main-content");
  let itemsToShow=[];
  document.querySelector("#heading").innerText = "List of TODO Items";
  mainContent.innerHTML = `<div id="item-list-div">
                          <table id="item-list-table">
                            <tr>
                                <th style="width: 12ch">Due Date</th>
                                <th style="width: 25ch">TODO Title</th>
                                <th style="width: 25ch">Project</th>
                                <th style="width: 35ch">Description</th>
                                <th style="width: 12ch">Priority</th>
                              </tr>
                            </table> 
                          </div>`;
  const itemList = document.querySelector("#item-list-table");
  document.querySelector("#item-list-div").addEventListener("dblclick",(e)=>{
    let closestRow = e.target.closest("tr");
    if(closestRow && closestRow.id){
      modTodoItems(items,projects,closestRow.id.slice(1));
    }
  })
    if(filter){
      let fltr = filter[0];
      switch(fltr){
        case "TODAY":
          {
            let dt = new Date().toISOString().substring(0,10);
            itemsToShow = items.filter(item=> item.todoDueDate === dt);
            showMessage("List of Todo Items for Today",msgDiv);
            break;
          }
        case "TIMEPERIOD": //Time Period
          console.log(filter);
          itemsToShow = items.filter(item => item.todoDueDate >= filter[1] && item.todoDueDate <= filter[2]);
          showMessage(`List of Todo Items for the period ${filter[1]} to ${filter[2]}`)
          break;
        case "DT": //Specific Date
          itemsToShow = items.filter(item=>item.todoDueDate === filter[1]);
          showMessage(`List of Todo Items for ${filter[1]}`);
          break;
        case "PRJ":
          itemsToShow = items.filter(item=> item.projectId === filter[1]);
          showMessage(`List of Todo Items for ${filter[2]}`,msgDiv);
          break;
      }
    
  }else{
    itemsToShow = items;
  }
  if(itemsToShow.length === 0){
    document.querySelector("#item-list-div").style.display = "none";
    showMessage("There are no Todo-Items",msgDiv);
    return -1;
  }
  let tempStr = ``;
  let tmpBGColor;
  let tmpFGColor;
  let projTitle;
  let prio;

  for(let i = 0;i<itemsToShow.length;i++){
    tempStr = ``;
    for(let j=0;j<projects.length;j++){
      if(projects[j].projectId === itemsToShow[i].projectId){
        projTitle = projects[j].projectTitle;
        tmpBGColor = projects[j].projectColor;
        tmpFGColor = getTextColor(hexToRGB(projects[j].projectColor));
        break;
      }
    }
    tempStr = `<tr id="T${itemsToShow[i].todoId}">`;
    tempStr += `<td>${itemsToShow[i].todoDueDate}</td>`;
    tempStr += `<td>${itemsToShow[i].todoTitle}</td>`;
    tempStr += `<td>${projTitle}</td>`;
    tempStr += `<td>${itemsToShow[i].todoDescription}</td>`;

    prio = itemsToShow[i].todoPriority;
    switch(prio){
      case "Normal":{
        tempStr += `<td style="background-color: orange; color: black">${prio}</td>`;
        break;
      }
      case "High":{
        tempStr += `<td style="background-color: red; color: black">${prio}</td>`;
        break;
      }
      case "Low":{
        tempStr += `<td style="background-color: lime; color: black">${prio}</td>`;
        break;
      }
    }
    
    tempStr += `</tr>`;
    itemList.innerHTML += tempStr;
    document.querySelector(`#T${itemsToShow[i].todoId}`).style.color = tmpFGColor;
    document.querySelector(`#T${itemsToShow[i].todoId}`).style.backgroundColor = tmpBGColor;
  }
  if(!filter){
    document.querySelector("#item-list-div").innerHTML += `<div id="buttons"><button type="button" id="btn-save-data" title="Save data to localStorage">Save</button><button type="button" id="btn-remove-data" title="Remove ALL data from localStorage">Remove</button></div>`
    document.querySelector("#buttons").style.marginBlockStart = "1rem";
    document.querySelector("#buttons").style.display = "grid";
    document.querySelector("#buttons").style.gridTemplateColumns = "1fr 1fr";
    document.querySelector("#btn-save-data").style.width = "9em";
    document.querySelector("#btn-save-data").addEventListener("click",()=>{
      writeData("todoItems",items);
      writeData("projects",projects);
    })
    document.querySelector("#btn-remove-data").addEventListener("click",()=>{
      if(!window.confirm("Are you sure you want to remove all data from localStorage? This can not be undone!")){
        return false;
      }
      if(!removeData("todoItems")){
        showMessage("Unable to delete Todo-Items, local storage available ?",msgDiv)
      }
      if(!removeData("projects")){
        showMessage("Unable to delete Projects, local storage available ?",msgDiv)
      }
      itemsToShow=[];
      mainContent.innerHTML = "";
    })
  }
}
