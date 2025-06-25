export function modTodoItems(){
    const mainContent = document.querySelector("#main-content");
    let htmlString = `<div id="input-details">
                <p>Title:</p>
                <input
                  type="text"
                  id="item-title"
                  title="Enter 'to-do' title/name"
                />
                <p>Project:</p>
                <input
                  type="text"
                  id="item-project"
                  title="Enter Project Name"
                />
                <p>Description:</p>
                <input
                  type="text"
                  id="item-description"
                  title="Enter description of todo item"
                />
                <p>Priority(Low,Normal,High):</p>
                <select id="item-priority">
                  <option value="low">Low</option>
                  <option value="normal" selected>Normal</option>
                  <option value="high">High</option>
                </select>
                <p>Due Date:</p>
                <input
                  type="date"
                  id="item-due-date"
                  title="Enter Due by date"
                />
                <p>Due Time:</p>
                <input
                  type="time"
                  id="item-due-time"
                  title="Enter Due by time"
                />
                <p>Location:</p>
                <input
                  type="text"
                  id="item-location"
                  title="Enter location of task, if applicable"
                />
                <p>Notes:</p>
                <textarea
                  id="item-notes"
                  title="Enter notes, if any"
                ></textarea>
                <p>Participants (Comma Separated):</p>
                <textarea
                  id="item-participants"
                  title="Enter list of participants, if any"
                ></textarea>
                <p>Checklist (Comma Separated):</p>
                <textarea
                  id="item-checklist"
                  title="Enter checklist, if any"
                ></textarea>
                <div id="buttons">
                  <button type="button">Save</button>
                  <button type="button">Reset</button>
                  <button type="button">Close</button>
                </div>
              </div>
              <div id="buffer">Buffer</div>
              <div id="project-details">
                <p>Project Details</p>
              </div>`
    mainContent.innerHTML=htmlString;
    mainContent.style.display = 'grid';
    mainContent.style.gridTemplateColumns = '2fr 1fr 1fr';
}