import  "../css/modtodoitems-styles.css";
import {TodoItem} from "./todoitem.js";
import {generateId, getProjectId, getTextColor, hexToRGB} from "./utils.js";
import {todoItemList} from "./todoitemlist.js";

export function modTodoItems(items,projects,itemId=""){
  const mainContent = document.querySelector("#main-content");
  let projTitle = "";
  let htmlString = `<div id="input-details">
              <p>Title:</p>
              <input
                type="text"
                id="item-title" required 
                title="Enter 'to-do' title/name"
              />
              <p>Project:</p>
              <input
                type="text"
                id="item-project" required 
                title="Enter Project Name"
              />
              <p>Description:</p>
              <input
                type="text"
                id="item-description" required 
                title="Enter description of todo item"
              />
              <p>Priority(Low,Normal,High):</p>
              <select id="item-priority">
                <option value="Low">Low</option>
                <option value="Normal" selected>Normal</option>
                <option value="High">High</option>
              </select>
              <p>Due Date:</p>
              <input
                type="date"
                id="item-due-date" required 
                title="Enter Due by date"
              />
              <p>Due Time:</p>
              <input
                type="time" required 
                id="item-due-time"
                title="Enter Due by time"
              />
              <p>Location:</p>
              <input
                type="text"
                id="item-location"
                title="Enter location of task, if applicable"
              />
              <p>Notes:</p>
              <textarea
                id="item-notes"
                title="Enter notes, if any"
              ></textarea>
              <p>Participants (Comma Separated):</p>
              <textarea
                id="item-participants"
                title="Enter list of participants, if any"
              ></textarea>
              <p>Checklist (Comma Separated):</p>
              <textarea
                id="item-checklist"
                title="Enter checklist, if any"
              ></textarea>
              <p>Task Completed</p>
              <input type="checkbox" id="item-iscompleted" name="item-iscompleted">`
  if(itemId){
    htmlString += `<div id="buttons-item">
                    <button type="button" id="btn-item-save" title="Save Changes">Save</button>
                    <button type="button" id="btn-item-reset" title="Undo Changes">Reset</button>
                    <button type="button" id="btn-item-delete"  title="Delete this item">Delete</button>
                    <button type="button" id="btn-item-close" title="Quit Item modification">Close</button>
                  </div></div>`
  }else{
    htmlString += `<div id="buttons-item">
                    <button type="button" id="btn-item-save" title="Save Changes">Save</button>
                    <button type="button" id="btn-item-reset" title="Undo Changes">Reset</button>
                    <button type="button" id="btn-item-close" title="Quit Item modification">Close</button>
                  </div></div>`
  }
  htmlString += `<div id="project-list-div">
                  <table id="project-list-table">
                    <tr>
                      <th style="width: 20ch">Project (Click to select)</th>
                    </tr>
                  </table>
                </div>`
  
  mainContent.innerHTML=htmlString;
  
  if(itemId){
    document.querySelector("#buttons-item").style.gridTemplateColumns = "repeat(4, 1fr)";
  }else{
    document.querySelector("#buttons-item").style.gridTemplateColumns = "repeat(3, 1fr)";
  }
  
  initForm(items,projects,itemId);
  document.querySelector("#buttons-item").addEventListener("click",(e)=>{
    let btn = e.target.id;
    switch(btn){
      case "btn-item-save":
        if(saveItem(items,projects,itemId)){
          projTitle = document.querySelector("#item-project").value;
          initForm(items,projects,"");
          document.querySelector("#item-project").value = projTitle;
          document.querySelector("#item-title").focus();
        }
        break;
      case "btn-item-reset":
        initForm(items,projects,itemId);
        break;
      case "btn-item-close":
        todoItemList(items,projects,false);
        break;
      case "btn-item-delete":
        if(!window.confirm("Do you really want to delete this item?")){
          return;
        }
          if(deleteItem(items,itemId)){
            itemId = "";
            initForm(items,projects,itemId);
          };
        // alert("Clicked Delete");
        break;
    }
  })
}

function initForm(items,projects,itemId){
    let projectList = document.querySelector("#project-list-table");
    let str = ``;
    if(itemId ===""){
    document.querySelector("#heading").innerText = "Add new TODO Item";
    document.querySelector("#item-project").value = "";
    document.querySelector("#item-title").value = "";
    document.querySelector("#item-description").value = "";
    document.querySelector("#item-priority").value = "Normal";
    document.querySelector("#item-due-date").value = "";
    document.querySelector("#item-due-time").value = "";
    document.querySelector("#item-location").value = "";
    document.querySelector("#item-notes").value = "";
    document.querySelector("#item-participants").value = "";
    document.querySelector("#item-checklist").value = "";
    document.querySelector("#item-iscompleted").value = false;
  }else 
    {
    document.querySelector("#heading").innerText = "Change TODO Item";
    for(let i = 0; i< items.length;i++){
      if(items[i].todoId===itemId){
        for(let j = 0; j<projects.length;j++){
          if(items[i].projectId === projects[j].projectId){
            document.querySelector("#item-project").value = projects[j].projectTitle;
            break;
          }
        }
        document.querySelector("#item-title").value = items[i].todoTitle;
        document.querySelector("#item-description").value = items[i].todoDescription;
        document.querySelector("#item-priority").value = items[i].todoPriority;
        document.querySelector("#item-due-date").value = items[i].todoDueDate;
        document.querySelector("#item-due-time").value = items[i].todoDueTime;
        if(items[i].todoLocation){
          document.querySelector("#item-location").value = items[i].todoLocation;
        }else{
          document.querySelector("#item-location").value = "";
        }
        if(items[i].todoNotes){
        document.querySelector("#item-notes").value = items[i].todoNotes;
        }else{
          document.querySelector("#item-notes").value = "";
        }
        document.querySelector("#item-participants").value = items[i].todoParticipants.toString();
        document.querySelector("#item-checklist").value = items[i].todoCheckList.toString();
        document.querySelector("#item-iscompleted").value = items[i].todoIsCompleted;
        break;
      }
    }
  }
  let tmpFGColor;
  let tmpBGColor;
  for(let i = 0; i<projects.length;i++){
    tmpBGColor = projects[i].projectColor;
    tmpFGColor = getTextColor(hexToRGB(projects[i].projectColor));
    str += `<tr><td style="background-color: ${tmpBGColor}; color: ${tmpFGColor}">${projects[i].projectTitle}</td></tr>`;
  }
  projectList.innerHTML += str;
  projectList.addEventListener("click",(e)=>{
    document.querySelector("#item-project").value = e.target.innerText;
  })
}

function saveItem(items,projects,itemId = ""){
  let enteredDate = document.querySelector("#item-due-date").value;
  if(!enteredDate){
    alert("Invalid Date!");
    document.querySelector("#item-due-date").focus();
    return false;
  }
  if(!document.querySelector("#item-title").value){
    alert("Todo Title is mandatory");
    document.querySelector("#item-title").focus();
    return false;
  }
  if(!document.querySelector("#item-description").value){
    alert("Todo Description is mandatory");
    document.querySelector("#item-description").focus();
    return false;
  }
  if(!document.querySelector("#item-project").value){
    document.querySelector("#item-project").value = "Default";
  }
  let item;
  let projId = getProjectId(projects, document.querySelector("#item-project").value);
  if(!itemId){
    item = new TodoItem(generateId(),projId,document.querySelector("#item-title").value);
  }else{
    for(let i = 0;i<items.length;i++){
      if(items[i].todoId === itemId){
        item = items[i];
        item.projectId = projId;
        item.todoTitle = document.querySelector("#item-title").value;
        break;
      }
    }
  }
item.todoDescription = document.querySelector("#item-description").value;
if(document.querySelector("#item-priority").value){
  item.todoPriority = document.querySelector("#item-priority").value;  
}else{
  item.todoPriority.value = "Normal";
}  
item.todoDueDate = document.querySelector("#item-due-date").value;
item.todoDueTime = document.querySelector("#item-due-time").value;
item.todoLocation = document.querySelector("#item-location").value;
item.todoNotes = document.querySelector("#item-notes").value;
if(document.querySelector("#item-participants").value){
  item.todoParticipants = document.querySelector("#item-participants").value.split(",");
}else {
  item.todoParticipants = [];
}
if(document.querySelector("#item-checklist").value){
  item.todoCheckList = document.querySelector("#item-checklist").value.split(",");
}else {
  item.todoCheckList = [];
}
item.todoIsCompleted = document.querySelector("#item-iscompleted").value;
if(!itemId){
  items.push(item);
  alert("Item Saved");
  return true;
}else {
  for(let i = 0;i<items.length;i++){
      if(items[i].todoId === itemId){
        items[i] = item;
        console.log(item);
        break;
      }
    }
    return true;
  }
}

function deleteItem(items,itemId){
  if(!itemId){
    return false;
  }
  for(let i = 0; items.length; i++){
    if(items[i].todoId === itemId){
      items.splice(i,1);
      return;
    }
  }
}