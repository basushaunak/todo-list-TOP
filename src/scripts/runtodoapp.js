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
        projects = readData("projects");
        todoItems = readData("todoItems");        
    }
    if(projects.length === 0){
            projects.push(new Project(generateId(),"Default","Default Project"));
    }
}

