//Sample Modlue - to populate the arrays with objects, for demo purpose.
import {TodoItem} from "./todoitem.js";
import {generateId,getProjectId} from "./utils.js";
import {Project} from "./project.js";
 

export function populateData(items,projects){
    //
    let project;
    if(!projects.some(prj=>prj.projectTitle=== "Buy")){
        project = new Project(generateId(),"Buy","Buy - todo");
        project.projectColor = "#f7d7d7";
        projects.push(project);
    }
    if(!projects.some(prj=>prj.projectTitle=== "Sell")){
        project = new Project(generateId(),"Sell","Sell - todo");
        project.projectColor = "#e2f1cf";
        projects.push(project);
    }
    if(!projects.some(prj=>prj.projectTitle=== "Gardening")){
        project = new Project(generateId(),"Gardening","Gardening - todo");
        project.projectColor = "#d3ebf7";   
        projects.push(project);
    }
    if(!projects.some(prj=>prj.projectTitle=== "Studying")){
        project = new Project(generateId(),"Studying","Studying - todo");
        project.projectColor = "#6886d0";
        projects.push(project);
    }
    if(!projects.some(prj=>prj.projectTitle=== "Vacation")){
        project = new Project(generateId(),"Vacation","Vacation - todo");
        project.projectColor = "#f0d7f7";
        projects.push(project);
    }
    if(!projects.some(prj=>prj.projectTitle=== "TOP")){
        project = new Project(generateId(),"TOP","TOP Course Planner - todo");
        project.projectColor = "#e89dcb";
        projects.push(project);
    }

    // Populate Items
    let item;
    
    if(!items.some(itm=>itm.todoTitle === "Buy Item 1")){
        item = new TodoItem(generateId(),getProjectId(projects,"Buy"),"Buy Item 1");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-09-30";
        item.todoDueTime = "23:59";
        item.todoPriority = "Normal";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Buy Item 2")){
        item = new TodoItem(generateId(),getProjectId(projects,"Buy"),"Buy Item 2");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-04-30";
        item.todoDueTime = "11:00";
        item.todoPriority = "High";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Buy Item 3")){
        item = new TodoItem(generateId(),getProjectId(projects,"Buy"),"Buy Item 3");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-10-30";
        item.todoDueTime = "13:00";
        item.todoPriority = "Low";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Buy Item 4")){
        item = new TodoItem(generateId(),getProjectId(projects,"Buy"),"Buy Item 4");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-08-12";
        item.todoDueTime = "15:00";
        item.todoPriority = "Low";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Buy Item 5")){
        item = new TodoItem(generateId(),getProjectId(projects,"Buy"),"Buy Item 5");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-07-28";
        item.todoDueTime = "17:30";
        item.todoPriority = "Normal";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Sell Item 1")){
        item = new TodoItem(generateId(),getProjectId(projects,"Sell"),"Sell Item 1");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-10-30";
        item.todoDueTime = "13:00";
        item.todoPriority = "Normal";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Sell Item 2")){
        item = new TodoItem(generateId(),getProjectId(projects,"Sell"),"Sell Item 2");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-03-21";
        item.todoDueTime = "18:30";
        item.todoPriority = "High";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Sell Item 3")){
        item = new TodoItem(generateId(),getProjectId(projects,"Sell"),"Sell Item 3");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-06-17";
        item.todoDueTime = "13:00";
        item.todoPriority = "Normal";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Sell Item 4")){
        item = new TodoItem(generateId(),getProjectId(projects,"Sell"),"Sell Item 4");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-06-22";
        item.todoDueTime = "08:45";
        item.todoPriority = "High";
        items.push(item);
    }

    if(!items.some(itm=>itm.todoTitle === "Sell Item 5")){
        item = new TodoItem(generateId(),getProjectId(projects,"Sell"),"Sell Item 5");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-01-31";
        item.todoDueTime = "10:30";
        item.todoPriority = "Low";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Gardening Task 1")){
        item = new TodoItem(generateId(),getProjectId(projects,"Gardening"),"Gardening Task 1");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-08-01";
        item.todoDueTime = "20:00";
        item.todoPriority = "High";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Gardening Task 2")){
        item = new TodoItem(generateId(),getProjectId(projects,"Gardening"),"Gardening Task 2");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-09-11";
        item.todoDueTime = "09:15";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Gardening Task 3")){
        item = new TodoItem(generateId(),getProjectId(projects,"Gardening"),"Gardening Task 3");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-07-23";
        item.todoDueTime = "15:30";
        item.todoPriority = "High";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Gardening Task 4")){
        item = new TodoItem(generateId(),getProjectId(projects,"Gardening"),"Gardening Task 4");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-11-10";
        item.todoDueTime = "16:45";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Gardening Task 5")){
        item = new TodoItem(generateId(),getProjectId(projects,"Gardening"),"Gardening Task 5");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-02-22";
        item.todoDueTime = "10:45";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Studying Task 1")){
        item = new TodoItem(generateId(),getProjectId(projects,"Studying"),"Studying Task 1");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-01-15";
        item.todoDueTime = "18:15";
        item.todoPriority = "Low";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Studying Task 2")){
        item = new TodoItem(generateId(),getProjectId(projects,"Studying"),"Studying Task 2");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-03-01";
        item.todoDueTime = "11:45";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Studying Task 3")){
        item = new TodoItem(generateId(),getProjectId(projects,"Studying"),"Studying Task 3");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-08-31";
        item.todoDueTime = "10:00";
        item.todoPriority = "Low";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Studying Task 4")){
        item = new TodoItem(generateId(),getProjectId(projects,"Studying"),"Studying Task 4");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-03-31";
        item.todoDueTime = "10:00";
        item.todoPriority = "High";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Studying Task 5")){
        item = new TodoItem(generateId(),getProjectId(projects,"Studying"),"Studying Task 5");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-01-30";
        item.todoDueTime = "10:00";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Vacation Task 1")){
        item = new TodoItem(generateId(),getProjectId(projects,"Vacation"),"Vacation Task 1");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-07-30";
        item.todoDueTime = "22:00";
        item.todoPriority = "High";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Vacation Task 2")){
        item = new TodoItem(generateId(),getProjectId(projects,"Vacation"),"Vacation Task 2");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-09-31";
        item.todoDueTime = "23:00";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Vacation Task 3")){
        item = new TodoItem(generateId(),getProjectId(projects,"Vacation"),"Vacation Task 3");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-07-31";
        item.todoDueTime = "10:00";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Vacation Task 4")){
        item = new TodoItem(generateId(),getProjectId(projects,"Vacation"),"Vacation Task 4");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-02-28";
        item.todoDueTime = "16:45";
        item.todoPriority = "High";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "Vacation Task 5")){
        item = new TodoItem(generateId(),getProjectId(projects,"Vacation"),"Vacation Task 5");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-11-25";
        item.todoDueTime = "09:00";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "The Odin Project - Task 1")){
        item = new TodoItem(generateId(),getProjectId(projects,"TOP"),"The Odin Project - Task 1");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-07-31";
        item.todoDueTime = "11:00";
        item.todoPriority = "High";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "The Odin Project - Task 2")){
        item = new TodoItem(generateId(),getProjectId(projects,"TOP"),"The Odin Project - Task 2");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-03-11";
        item.todoDueTime = "10:00";
        item.todoPriority = "High";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "The Odin Project - Task 3")){
        item = new TodoItem(generateId(),getProjectId(projects,"TOP"),"The Odin Project - Task 3");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2026-01-15";
        item.todoDueTime = "12:00";
        item.todoPriority = "Normal";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "The Odin Project - Task 4")){
        item = new TodoItem(generateId(),getProjectId(projects,"TOP"),"The Odin Project - Task 4");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-04-30";
        item.todoDueTime = "11:45";
        item.todoPriority = "Low";
        items.push(item);
    }
    
    if(!items.some(itm=>itm.todoTitle === "The Odin Project - Task 5")){
        item = new TodoItem(generateId(),getProjectId(projects,"TOP"),"The Odin Project - Task 5");
        item.todoDescription = item.todoTitle + " " + "Description"
        item.todoDueDate = "2025-11-10";
        item.todoDueTime = "10:30";
        item.todoPriority = "Normal";
        items.push(item);
    }
}