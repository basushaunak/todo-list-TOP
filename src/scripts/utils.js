import { Project } from "./project.js";
// export function generateId() {
//   const now = new Date();

//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");
//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");
//   const seconds = String(now.getSeconds()).padStart(2, "0");

//   return `${year}${month}${day}${hours}${minutes}${seconds}`;
// }

export function generateId(){
    return crypto.randomUUID();
}

export function startOfWeek(date=new Date())
{
  // Calculate the difference between the date's day of the month and its day of the week
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  // Set the date to the start of the week by setting it to the calculated difference
  return new Date(date.setDate(diff));
}

export function endOfWeek(date=new Date()){
  // Calculate the date of the last day of the week by adding the difference between the day of the month and the day of the week, then adding 6.
  var lastday = date.getDate() - (date.getDay() - 1) + 6;
  // Set the date to the calculated last day of the week.
  return new Date(date.setDate(lastday));
}

export function properCase(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function setPadding(str, len = str.length, char = " "){
  if (str.length === len){
    return str;
  }
  if (str.length > len){
    return str.slice(0,len);
  }
  return str.padEnd(len,char);
}

export function isDuplicate(array, item) {
  return array.includes(item);
}

export function isLocalStorageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function showMessage(msg, element = "") {
  if (!element) {
    console.log(msg);
    return;
  }
  element.innerText = msg;
}

export function removeTodoItem(todoArray, itemTitle) {
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].todoTitle === itemTitle) {
      todoArray.splice(i, 1);
      return 0;
    }
  }
  return -1;
}

export function removeProject(projectArray, todoArray, title) {
  let idx = 0;
  let projId = "";
  for (let i = 9; i < projectArray.length; i++) {
    if (projectArray[i].projectTitle === title) {
      idx = i;
      projId = projectArray[i].projectId;
      break;
    }
  }
  if (!idx) {
    //'title' was not found in the list of projects
    return -1;
  }
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].projectId === projId) {
      //There are todo items assigned to this project ID, so can not be deleted.
      return -2;
    }
  }
  projectArray.splice(idx, 1);
}



//get opposite color
export function getOppositeHSL(h, s, l) {
  return {
    h: (h + 180) % 360,
    s: s,
    l: l,
  };
}

export function hexToRGB(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
}


export function getOppositeColorRGB(rgb) {
  let r = 255 - rgb.r;
  let g = 255 - rgb.g;
  let b = 255 - rgb.b;
  return `rgb(${r},${g},${b})`;
}

//for high visibility of text

export function getTextColor(rgb) {
  const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  return luminance > 128 ? "#000000" : "#ffffff";
}

export function readData(dataName) {
  let inputStr = localStorage.getItem(dataName);
  if (!inputStr) {
    return [];
  }
  return JSON.parse(inputStr);
}

export function writeData(dataName, data) {
  try {
    const str = JSON.stringify(data);
    localStorage.setItem(dataName, str);
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

export function removeData(dataName){
  try {
    localStorage.removeItem(dataName);
    return true;
  } catch {
    return false;
  }
}

export function getProjectId(array, title) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].projectTitle === title) {
      return array[i].projectId;
    }
  }
  let projId = generateId();
  array.push(new Project(projId, title));
  return projId;
}

export function showProjectsOnSideBar(projects,menuProjects){
  let str;
  menuProjects.innerHTML = `<p class="sidebar-heading" id="txt-projects-all" title="Show All Projects">All Projects</p>
                            <p id="txt-project-new" title="Add a new Project">New Project...</p>`
  projects.sort((a,b)=>a.projectTitle.localeCompare(b.projectTitle));
  for(let i = 0; i < projects.length; i++){
    str = ``;
    str = `<p id=${projects[i].projectId}>${projects[i].projectTitle}</p>`;
    menuProjects.innerHTML += str;
  }
  str = "";
}