import { Project } from "./todoprojects.js";
export function generateId() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
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

export function showError(errorMsg, element = "") {
  if (!element) {
    console.log(errorMsg);
    return;
  }
  element.innerText = errorMsg;
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

export function hexToRgb(hex) {
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

export function getTextColor(r, g, b) {
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
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
