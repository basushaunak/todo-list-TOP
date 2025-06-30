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
                    <select multiple name="project-list" id="project-list">
                    </select>
                    </table> 
                    </div>
                </div>`;
    mainContent.innerHTML = str;
}