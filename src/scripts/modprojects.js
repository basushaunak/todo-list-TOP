export function modProjects(items,projects,projectId=""){
    const mainContent = document.querySelector("#main-content");
    let str = `
                <div id="project-mod">
                    <div id="project-details-div">
                    <p>Project Name (Title):</p><input type="text" id="project-title" title="Enter Project Name">
                    <p>Project Description:</p><textarea id="project-desc" title="Enter a description (optional)"></textarea>
                    <p>Choose a Color:</p><input type="color" id="project-color" value="#ffffff">
                    <div id="proj-buttons">
                        <button type="button" id="btn-prj-save">Save</button>
                        <button type="button" id="btn-prj-delete">Delete</button>
                        <button type="button" id="btn-prj-cancel">Cancel</button>
                    </div>
                    </div>
                    <div id="project-list-div">
                    <select multiple name="item-list" id="item-list">
                    </select>
                    </table> 
                    </div>
                </div>`;
    mainContent.innerHTML = str;
    populateForm(projects,items,projectId);
    alert(projectId);

}

function populateForm(projects,items,projectId){
    let itemsToShow;
    let itemList = document.querySelector("#item-list");
    if(!projectId){
        document.querySelector("#project-title").value = "";
        document.querySelector("#project-desc").value = "";
        document.querySelector("#project-color").value = "#ffffff";
    }else {
        for(let i = 0;i < projects.length;i++){
            if(projects[i].projectId === projectId){
                document.querySelector("#project-title").value = projects[i].projectTitle;
                document.querySelector("#project-desc").value = projects[i].projectDescription;
                document.querySelector("#project-color").value = projects[i].projectColor;
                itemsToShow = items.filter(item=>item.ProjectId===projectId);
                for(let j = 0; j<itemsToShow.length;j++){
                    itemList.innerHTML += `<option>${itemsToShow[j].todoTitle}</option>`;
                }
            }
        }
    }

}