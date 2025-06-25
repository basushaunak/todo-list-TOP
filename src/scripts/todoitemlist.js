export function todoItemList(){
    const mainContent = document.querySelector("#main-content");
    let str = `<div id="item-list-div">
                <select multiple id="item-list">
                </select>
              </div>`
    mainContent.innerHTML = str;
}