import {isLocalStorageAvailable, showError, generateId, readData, writeData, getProjectId, properCase, properDate, properTime, removeProject, removeTodoItem} from "./utils.js";
import {Project} from "./todoprojects.js";
import {TodoItem} from "./todoitems.js";

export function runTodoApp(){
    let projData=[];
    let todoData=[];
    let item={};
    const projects=[];
    const todoItems=[];
    const div = "";

    if(!isLocalStorageAvailable("localStorage")){
        showError("Local Storage is not available, data will not be saved!!!",div);
    }else{
        projData = readData("projects");
        todoData = readData("todoItems");
        for(let i = 0;i < projData.length;i++){
            // #projectId;
            // #projectTitle;
            // #projectDescription;
            // #projectColor;
            item = new Project(projData[i].projectId, projData[i].projectTitle, projData[i].projectDescription);
            item = item.projectColor = projData[i].projectColor;
            projects.push(item);
        }
        projData = [];
        for(let i = 0; i< todoData.length; i++){
            item = new TodoItem(todoData[i].todoId,todoData[i].projectId,todoData[i].todoTitle);
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
    if(projects.length === 0){
            projects.push(new Project(generateId(),"Default","Default Project"));
    }
	let answer = "";
	let exitLoop = false;
	let input;
	do{
		answer = prompt("Enter 1: Add Todo items, 2: Add Projects, 3: Remove Todo Items, 4: Remove Projects, 5: List Todo items, 6: List Projects, Any other key: Quit");
		switch(answer){
			case "1":
				do {
					input = addTodoItem(projects);
					if(input === -1){
						showError("Data entry cancelled",div);
						break;
					};
                    todoItems.push(input);
                    input="";
				} while(true);
                console.log(projects);
				console.log(todoItems);
				input="";
				break;
			case "2":
				do {
					input = addProject(projects);
					if(input === -1){
						showError("Data entry cancelled",div);
						break;
					};
                    projects.push(input);
                    input="";
				} while(true);
				input="";
				console.log(projects);
				console.log(todoItems);
				break;
			case "3":
				input = prompt("Enter Todo entry to remove");
				rtnValue = 0;
				if(input){
					rtnValue = removeTodoItem(todoItems,input);
				}
				if(rtnValue === -1){
					showError("Unable to delete",div);
				}
				break;
			case "4":
				input = prompt("Enter Project to remove");
				rtnValue = 0;
				if(input){
					rtnValue = removeProject(projects,todoItems,input);
					if(rtnValue === -1){
						showError(`"${input}" not found or already deleted.`,div);
					}else if(rtnValue === -2){
						showError(`"${input}" can not be deleted, tasks exists under it.`,div);
					}
				}
				break;
			case "5":
				console.log(JSON.stringify(todoItems));
				break;
			case "6":
				console.log(JSON.stringify(projects));
				break;
			default:
				exitLoop = true;
				break;
		}
	} while(!exitLoop)
}

function addTodoItem(projects){
    let taskTitle = prompt("Enter Task Name");
    if(!taskTitle){
        return -1;
    }
    let projTitle = prompt("Enter Project Name: ");
    let projId = "";
    if(projTitle === null){
        return -1;
    }
    if(!projTitle){
        projTitle = "Default";
    }
    projId = getProjectId(projects,properCase(projTitle));
    let taskDesc = prompt("Enter Project Description");
    let taskPriority = prompt("Enter Task Priority (Low, Normal, High)");
    if(taskPriority === null){
        return -1;
    }
    taskPriority = properCase(taskPriority);
    let taskDueDate = prompt("Enter Due Date (dd/mm/yyyy)");
    if(!taskDueDate){
        return -1;
    }
    taskDueDate = properDate(taskDueDate);
    let taskDueTime = prompt("Enter Due Time (HH:MM)");
    if(!taskDueTime){
        return -1;
    }
    taskDueTime = properTime(taskDueTime);
    let taskLocation = prompt("Enter Location");
    if(taskLocation === null){
        return -1;
    }
    taskLocation = properCase(taskLocation);
    let taskNotes = prompt("Enter notes if any");
    if(taskNotes === null){
        return -1;
    }
    let taskParticipants = [];
    let taskPart = "";
    let i = 1;
    do {
        taskPart = prompt(`Enter Participant #${i} Name`);
        i++;
        if(!taskPart){
            break;
        }
        taskParticipants.push(taskPart);
        taskPart = "";
    } while(true);
    let taskCheckList = [];
    let taskCheckItem = "";
    i = 1;
    do {
        taskCheckItem = prompt(`Enter Check List Item # ${i}`)
        i++;
        if(!taskCheckItem){
            break;
        }
        taskCheckList.push(taskCheckItem);
        taskCheckItem = "";
    } while(true);
    let inputItem = new TodoItem(generateId(),projId,taskTitle);
    inputItem.todoDescription = taskDesc;
    inputItem.todoPriority = taskPriority;
    inputData.todoDueDate = taskDueDate;
    inputData.todoDueTime = taskDueTime;
    inputData.todoLocation = taskLocation;
    inputData.todoNotes = taskNotes;
    inputData.todoParticipants = taskParticipants;
    inputData.todoCheckList = taskCheckList;
    inputData.todoIsCompleted = false;
	return inputData;
}

function addProject(projects){
	let projectTitle = prompt("Enter Project Name");
	if(!projectTitle){
		return -1;
	}
	let projectDesc = prompt("Enter Description");
	if(projectDesc === null){
		return -1;
	}
	for(let i = 0; i < projects.length;i++){
		if(projects[i].projectTitle = projectTitle){
			showError("Duplicate Project Name/Title");
			return -2;
		}
	}
	let input = new Project(generateId(),projectTitle)
	input.projectDescription = projectDesc;
	return input;
}
