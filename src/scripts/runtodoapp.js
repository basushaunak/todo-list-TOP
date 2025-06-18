import {isLocalStorageAvailable, showError, generateId} from "./utils.js";
import {Project} from "./todoprojects.js";
import {TodoItem} from "./todoitems.js";

function runTodoApp(){
    const projects=[];
    const todoItems=[];
    const div = "";
    if(!isLocalStorageAvailable("localStorage")){
        showError("Local Storage is not available, data will not be saved!!!",div);
    }else{
        projects = populateProjects();
        todoItems = populateTodoItems();        
    }
    if(projects.length === 0){
            projects.push(new Project(generateId(),"Default","Default Project"));
    }
}




function populateProjects(){
    let projectString = localStorage.getItem("projects");
    if(!projectString){
        return [];
    }
    return JSON.parse(projectString);

}

function populateTodoItems(){
    let todoItemString = localStorage.getItem("todoItems");
    if(!todoItemString){
        return [];
    }
    return JSON.parse(todoItemString);
}


function writeData(dataName,data){	
	try {
    const str = JSON.stringify(data);
    localStorage.setItem(dataName, data);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      localStorage &&
      localStorage.length !== 0
    );
 }
}

function getProjectId(array,title){
	for(i=0;i<array.length;i++){
		if(array[i].projectTitle === title){
			return array[i].projectId;
		}

	}
	let projId = generateId();
	array.push(new Project(projId,title));
	return projId;
}

