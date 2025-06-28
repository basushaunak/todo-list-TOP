import {TodoItems} from "./todoitems.js";

export function modTodoItems(items,projects,itemId=""){
    const mainContent = document.querySelector("#main-content");
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
                  <option value="low">Low</option>
                  <option value="normal" selected>Normal</option>
                  <option value="high">High</option>
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
                <label for = "item-iscompleted">Task Completed</label>
                <input type="checkbox" id="item-iscompleted" name="item-iscompleted">
                <div id="buttons">
                  <button type="button" id="btn-save">Save</button>
                  <button type="button" id="btn-reset">Reset</button>
                  <button type="button" id="btn-close">Close</button>
                </div>
              </div>
              <div id="buffer">Buffer</div>
              <div id="project-details">
                <p>Project Details</p>
              </div>`
    mainContent.innerHTML=htmlString;
    mainContent.style.display = 'grid';
    mainContent.style.gridTemplateColumns = '2fr 1fr 1fr';
    initForm(items,projects,itemId);
    document.querySelector("#btn-save").addEventListener("click",()=>{
      if(saveItem(items,projects)){
        initForm(items,projects,"");
      }
    });
    document.querySelector("#btn-reset").addEventListener("click",()=>{
      initForm(items,projects,itemId);
    });
    document.querySelector("#btn-close").addEventListener("click",()=>{
      alert("Clicked Close");
    });
}

function initForm(items,projects,itemId){
    if(itemId ===""){
    document.querySelector("#heading").innerText = "Add new TODO Item";
    document.querySelector("#item-project").value = "";
    document.querySelector("#item-title").value = "";
    document.querySelector("#item-description").value = "";
    document.querySelector("#item-priority").value = "";
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
      if(items[i]===itemId){
        for(let j = 0; j<projects.length;j++){
          if(items.projectId === projects[j].projectId){
            document.querySelector("#item-project").value = projects[j].projectTitle;
            break;
          }
        }
        document.querySelector("#item-title").value = items[i].todoTitle;
        document.querySelector("#item-description").value = items[i].todoDescription;
        document.querySelector("#item-priority").value = items[i].todoPriority;
        document.querySelector("#item-due-date").value = items[i].todoDueDate;
        document.querySelector("#item-due-time").value = items[i].todoDueTime;
        document.querySelector("#item-location").value = items[i].todoLocation;
        document.querySelector("#item-notes").value = items[i].todoNotes;
        document.querySelector("#item-participants").value = items[i].todoParticipants.toString();
        document.querySelector("#item-checklist").value = items[i].todoCheckList.toString();
        document.querySelector("#item-iscompleted").value = items[i].todoIsCompleted;
        break;
      }
    }
  }
}


function saveItem(items,projects){
  let enteredDate = document.querySelector("#item-due-date").value;
  if(!enteredDate){
    alert("Invalid Date!");
    document.querySelector("#item-due-date").focus();
    return false;
  }
  let enteredTime = document.querySelector("#item-due-time").value;
  alert(enteredTime);
}