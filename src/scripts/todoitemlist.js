import {setPadding,getOppositeColorRGB} from "./utils.js";

export function todoItemList(items,projects){
    const mainContent = document.querySelector("#main-content");
    let tempStr = ``;
    let tmpBGColor;
    let tmpFGColor;
    let projTitle;
    mainContent.innerHTML = `<div id="item-list-div">
                              <select multiple id="item-list">
                              </select>
                            </div>`
    for(let i = 0;i<items.length;i++){
      for(let j=0;j<projects.length;j++){
        if(projects[j].projectId === items[i].projectId){
          projTitle = setPadding(projects[j].projectTitle,15," ");
          tmpBGColor = projects[j].projectColor;
          tmpFGColor = getOppositeColorRGB(projects[j].projectColor);
          break;
        }
      }
      tempStr = `<option id = "${items[i].todoId}" name = "${items[i].todoId}">`;
      // tempStr = `<option id = "${items[i].todoId}" name = "${items[i].todoId}" style="background-color: ${tmpBGColor}; color: ${tmpFGColor}">`;
      tempStr += `: ${items[i].todoDueDate}`;
      tempStr += setPadding(items[i].todoTitle,20," ");
      tempStr += `: ${setPadding(projTitle,15," ")}`;
      tempStr += `: ${setPadding(items[i].todoDescription,30,0)}`;
      tempStr = `</option>`
      mainContent.innerHTML += tempStr;
      document.querySelector(`"#{items[i].todoId}`).style.color = tmpFGColor;
      document.querySelector(`"#{items[i].todoId}`).style.backgroundColor = tmpBGColor;
    }
}