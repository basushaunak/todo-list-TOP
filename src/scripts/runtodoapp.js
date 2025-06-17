import "../css/runtodo-styles.css";
import {
  isLocalStorageAvailable,
  showMessage,
  generateId,
  readData,
  startOfWeek,
  endOfWeek,
  showProjectsOnSideBar
} from "./utils.js";
import { Project } from "./project.js";
import { TodoItem } from "./todoitem.js";
import {todoItemList} from "./todoitemlist.js";
import {modTodoItems} from "./modtodoitems.js";
import {populateData} from "./populatedata.js";
import {projectList} from "./projectlist.js";
import { modProjects } from "./modprojects.js";

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
          showMessage("All todo item",msgDiv);
          todoItemList(todoItems,projects,false);
          break;
        }
      case "txt-task-new":
        {
          showMessage("Add new todo item",msgDiv);
          modTodoItems(todoItems,projects,"");
          break;
        }
      case "txt-task-today":
        {          
          todoItemList(todoItems,projects,["TODAY","",""]);
          break;
        }
      case "txt-task-thisweek":
        {
          let startOfTimePeriod = startOfWeek().toISOString().slice(0,10);
          let endOfTimePeriod = endOfWeek().toISOString().slice(0,10);
          todoItemList(todoItems,projects,["TIMEPERIOD",startOfTimePeriod,endOfTimePeriod]);
          break;
        }
      case "txt-task-thismonth":
        {
          let startOfTimePeriod = new Date();
          startOfTimePeriod = new Date(startOfTimePeriod.setDate(1));
          let tmpDate = new Date(startOfTimePeriod);
          let endOfTimePeriod = new Date(tmpDate.setMonth(tmpDate.getMonth()+1));
          tmpDate = null;
          endOfTimePeriod = new Date(endOfTimePeriod.setDate(0));
          startOfTimePeriod = startOfTimePeriod.toISOString().slice(0,10);
          endOfTimePeriod = endOfTimePeriod.toISOString().slice(0,10);
          todoItemList(todoItems,projects,["TIMEPERIOD",startOfTimePeriod,endOfTimePeriod]);
          break;
        }
      case "txt-task-nextweek":
        {
          let tmpDate = new Date();
          tmpDate.setDate(tmpDate.getDate()+7);
          let startOfTimePeriod = startOfWeek(new Date(tmpDate)).toISOString().slice(0,10);
          let endOfTimePeriod = endOfWeek(new Date(tmpDate)).toISOString().slice(0,10);
          todoItemList(todoItems,projects,["TIMEPERIOD",startOfTimePeriod,endOfTimePeriod]);
          break;
        }
      case "txt-task-nextmonth":
        {
          let startOfTimePeriod = new Date();
          startOfTimePeriod = new Date(startOfTimePeriod.setMonth(startOfTimePeriod.getMonth()+1));
          startOfTimePeriod = new Date(startOfTimePeriod.setDate(1));
          let tmpDate = new Date(startOfTimePeriod);
          let endOfTimePeriod = new Date(tmpDate.setMonth(tmpDate.getMonth()+1));
          tmpDate = null;
          endOfTimePeriod = new Date(endOfTimePeriod.setDate(0));
          startOfTimePeriod = startOfTimePeriod.toISOString().slice(0,10);
          endOfTimePeriod = endOfTimePeriod.toISOString().slice(0,10);
          todoItemList(todoItems,projects,["TIMEPERIOD",startOfTimePeriod,endOfTimePeriod]);
          break;
        }
      case "btn-date-go":
        {
          if(!(document.querySelector("#filter-date").value.length === 0)){
            todoItemList(todoItems,projects,["DT",document.querySelector("#filter-date").value,]);
          }else{
            alert("You must specify a date");
          }
          // showMessage(`Todo Items for ${document.querySelector("#filter-date").value}`,msgDiv);
          break;
        }
    }
  });
  menuProjects.addEventListener("click",(e)=>{
    switch(e.target.id){
      case "txt-projects-all":
        projectList(todoItems,projects);
        break;
      case "txt-project-new":
        // alert("txt-new-project");
        modProjects(todoItems,projects);
        break;
      default:
        todoItemList(todoItems,projects,["PRJ",e.target.id,e.target.innerText]);
        break;
    }
  });

  if (!isLocalStorageAvailable("localStorage")) {
    showMessage("Local Storage is not available, data will not be saved!!!", msgDiv);
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
  if(todoItems.length === 0){
    if(window.confirm("Do you want fill with sample data?")){
      populateData(todoItems,projects);
    }
  }  
  if (projects.length === 0) {
    projects.push(new Project(generateId(), "Default", "Default Project"));
  }
  showProjectsOnSideBar(projects,menuProjects);
  // let str ;
  // projects.sort((a,b)=>a.projectTitle.localeCompare(b.projectTitle));
  // for(let i = 0; i < projects.length; i++){
  //   str = ``;
  //   str = `<p id=${projects[i].projectId}>${projects[i].projectTitle}</p>`;
  //   menuProjects.innerHTML += str;
  // }
  todoItems.sort((a,b)=>a.todoDueDate.localeCompare(b.todoDueDate));
  todoItemList(todoItems,projects,false);
}
