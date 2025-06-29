import {
  isLocalStorageAvailable,
  showError,
  generateId,
  readData,
} from "./utils.js";
  // writeData,
  // getProjectId,
  // properCase,
  // properDate,
  // properTime,
  // removeProject,
  // removeTodoItem,
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
  // let answer = "";
  // let exitLoop = false;
  // let input;
  // do {
  //   answer = prompt(
  //     "Enter 1: Add Todo items, 2: Add Projects, 3: Remove Todo Items, 4: Remove Projects, 5: List Todo items, 6: List Projects, 7: Save Data, 8: Delete Data Any other key: Quit",
  //   );
  //   let rtnValue;
  //   switch (answer) {
  //     case "1":{
  //       let keepAdding = true;
  //       do {
  //         input = addTodoItem(projects);
  //         if (input === -1) {
  //           showError("Data entry cancelled", msgDiv);
  //           keepAdding = false;
  //           break;
  //         }
  //         if (input === -2) {
  //           showError("Duplicate Project Name/Title");
  //           continue;
  //         }
  //         todoItems.push(input);
  //         input = "";
  //       } while (keepAdding);
  //       console.log(projects);
  //       console.log(todoItems);
  //       input = "";
  //       break;
  //     }
  //     case "2":{
  //       let keepAdding = true;
  //       do {
  //         input = addProject(projects);
  //         if (input === -1) {
  //           showError("Data entry cancelled", msgDiv);
  //           keepAdding=false;
  //           break;
  //         }
  //         if (input === -2) {
  //           showError("Duplicate Project Name/Title");
  //           continue;
  //         }
  //         projects.push(input);
  //         input = "";
  //       } while (keepAdding);
  //       input = "";
  //       console.log(projects);
  //       console.log(todoItems);
  //       break;
  //     }
  //     case "3":
  //       input = prompt("Enter Todo entry to remove");
  //       rtnValue = 0;
  //       if (input) {
  //         rtnValue = removeTodoItem(todoItems, input);
  //       }
  //       if (rtnValue === -1) {
  //         showError("Unable to delete", msgDiv);
  //       }
  //       break;
  //     case "4":
  //       input = prompt("Enter Project to remove");
  //       rtnValue = 0;
  //       if (input) {
  //         rtnValue = removeProject(projects, todoItems, input);
  //         if (rtnValue === -1) {
  //           showError(`"${input}" not found or already deleted.`, msgDiv);
  //         } else if (rtnValue === -2) {
  //           showError(
  //             `"${input}" can not be deleted, tasks exists under it.`,
  //             msgDiv,
  //           );
  //         }
  //       }
  //       break;
  //     case "5":
  //       console.log(JSON.stringify(todoItems));
  //       break;
  //     case "6":
  //       console.log(JSON.stringify(projects));
  //       break;
  //     case "7":{
  //       if(isLocalStorageAvailable("localStorage")){
  //         writeData("projects",projects);
  //         writeData("todoItems",todoItems);
  //       }else{
  //         showError("Unable to write: Local Storage unavailable",msgDiv);
  //       }
  //       break;
  //       }
  //     case "8":
  //       {
  //         if(isLocalStorageAvailable("localStorage")){
  //           localStorage.removeItem("projects");
  //           localStorage.removeItem("todoItems");
  //         }else{
  //           showError("Nothing to remove: Local storage unavailable",msgDiv);
  //         }
  //         break;
  //       }
  //     default:
  //       exitLoop = true;
  //       break;
  //   }
  // } while (!exitLoop);

// function addTodoItem(projects) {
//   let taskTitle = prompt("Enter Task Name");
//   if (!taskTitle) {
//     return -1;
//   }
//   let projTitle = prompt("Enter Project Name: ");
//   let projId = "";
//   if (projTitle === null) {
//     return -1;
//   }
//   if (!projTitle) {
//     projTitle = "Default";
//   }
//   projId = getProjectId(projects, projTitle);
//   let taskDesc = prompt("Enter Project Description");
//   let taskPriority = prompt("Enter Task Priority (Low, Normal, High)");
//   if (taskPriority === null) {
//     return -1;
//   }
//   taskPriority = properCase(taskPriority);
//   let taskDueDate = prompt("Enter Due Date (dd/mm/yyyy)");
//   if (!taskDueDate) {
//     return -1;
//   }
//   taskDueDate = properDate(taskDueDate);
//   let taskDueTime = prompt("Enter Due Time (HH:MM)");
//   if (!taskDueTime) {
//     return -1;
//   }
//   taskDueTime = properTime(taskDueTime);
//   let taskLocation = prompt("Enter Location");
//   if (taskLocation === null) {
//     return -1;
//   }
//   let taskNotes = prompt("Enter notes if any");
//   if (taskNotes === null) {
//     return -1;
//   }
//   let taskParticipants = [];
//   let taskPart = "";
//   let i = 1;
//   let keepAdding = true;
//   do {
//     taskPart = prompt(`Enter Participant #${i} Name`);
//     i++;
//     if (!taskPart) {
//       keepAdding=false;
//       break;
//     }
//     taskParticipants.push(taskPart);
//     taskPart = "";
//   } while (keepAdding);
//   let taskCheckList = [];
//   let taskCheckItem = "";
//   i = 1;
//   keepAdding=true;
//   do {
//     taskCheckItem = prompt(`Enter Check List Item # ${i}`);
//     i++;
//     if (!taskCheckItem) {
//       keepAdding=false;
//       break;
//     }
//     taskCheckList.push(taskCheckItem);
//     taskCheckItem = "";
//   } while (keepAdding);
//   let inputItem = new TodoItem(generateId(), projId, taskTitle);
//   inputItem.todoDescription = taskDesc;
//   inputItem.todoPriority = taskPriority;
//   inputItem.todoDueDate = taskDueDate;
//   inputItem.todoDueTime = taskDueTime;
//   inputItem.todoLocation = taskLocation;
//   inputItem.todoNotes = taskNotes;
//   inputItem.todoParticipants = taskParticipants;
//   inputItem.todoCheckList = taskCheckList;
//   inputItem.todoIsCompleted = false;
//   return inputItem;
// }

// function addProject(projects) {
//   let projectTitle = prompt("Enter Project Name");
//   if (!projectTitle) {
//     return -1;
//   }
//   let projectDesc = prompt("Enter Description");
//   if (projectDesc === null) {
//     return -1;
//   }
//   for (let i = 0; i < projects.length; i++) {
//     if (projects[i].projectTitle === projectTitle) {
//       return -2;
//     }
//   }
//   let input = new Project(generateId(), projectTitle);
//   input.projectDescription = projectDesc;
//   return input;
// }
