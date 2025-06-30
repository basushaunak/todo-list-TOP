import {
  isLocalStorageAvailable,
  showError,
  generateId,
  readData,
} from "./utils.js";
import { Project } from "./todoprojects.js";
import { TodoItem } from "./todoitems.js";
import {todoItemList} from "./todoitemlist.js";
import {modTodoItems} from "./modtodoitems.js";

export function runTodoApp() {
  let projData = [];
  let todoData = [];
  let item = {};
  const projects = [];
  const todoItems = [];
  const msgDiv = document.querySelector("#status-message");
  const menuTasks = document.querySelector("#tasks-div");
  const menuProjects = document.querySelector("#projects-div");
  menuTasks.addEventListener("click",(e)=>{
    switch (e.target.id){
      case "txt-all-tasks":
        {
          showError("All todo item",msgDiv);
          todoItemList(todoItems,projects,false);
          break;
        }
      case "txt-task-new":
        {
          showError("Add new todo item",msgDiv);
          modTodoItems(todoItems,projects,"");
          break;
        }
      case "txt-thisweek":
        {
          showError("Todo Items for this week",msgDiv);
          break;
        }
      case "txt-thismonth":
        {
          showError("Todo Items for this month",msgDiv);
          break;
        }
      case "text-nextweek":
        {
          showError("Todo Items for next week",msgDiv);
          break;
        }
      case "text-nextmonth":
        {
          showError("Todo Items for next month",msgDiv);
          break;
        }
      case "btn-date-go":
        {
          showError(`Todo Items for ${document.querySelector("#filter-date").value}`,msgDiv);
          break;
        }
    }
  });
  menuProjects.addEventListener("click",(e)=>{showError("You Clicked: "+e.target.id,msgDiv)});

  if (!isLocalStorageAvailable("localStorage")) {
    showError("Local Storage is not available, data will not be saved!!!", msgDiv);
  } else {
    projData = readData("projects");
    todoData = readData("todoItems");
    for (let i = 0; i < projData.length; i++) {
      item = new Project(
        projData[i].projectId,
        projData[i].projectTitle,
        projData[i].projectDescription,
      );
      item.projectColor = projData[i].projectColor;
      projects.push(item);
    }
    projData = [];
    for (let i = 0; i < todoData.length; i++) {
      item = new TodoItem(
        todoData[i].todoId,
        todoData[i].projectId,
        todoData[i].todoTitle,
      );
      item.todoDescription = todoData[i].todoDescription;
      item.todoPriority = todoData[i].todoPriority;
      item.todoDueDate = todoData[i].todoDueDate;
      item.todoDueTime = todoData[i].todoDueTime;
      item.todoLocation = todoData[i].todoLocation;
      item.todoNotes = todoData[i].todoNotes;
      item.todoParticipants = todoData[i].todoParticipants;
      item.todoCheckList = todoData[i].todoCheckList;
      item.todoIsCompleted = todoData[i].todoIsCompleted;
      todoItems.push(item);
    }
    todoData=[];
  }
  if (projects.length === 0) {
    projects.push(new Project(generateId(), "Default", "Default Project"));
  }
  let str ;
  for(let i = 0; i < projects.length; i++){
    str = ``;
    str = `<p id=${projects[i].projectId}>${projects[i].projectTitle}</p>`;
    menuProjects.innerHTML += str;
  }
  todoItemList(todoItems,projects,false);
}
