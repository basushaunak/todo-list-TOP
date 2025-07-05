export class Project {
  #projectId;
  #projectTitle;
  #projectDescription;
  #projectColor;
  constructor(id, title, desc = "",color = "#37adff") {
    this.#projectId = id;
    this.#projectTitle = title;
    this.#projectDescription = desc;
    this.#projectColor = color;
  }
  set projectId(id) {
    //Cant be changed
  }
  get projectId() {
    return this.#projectId;
  }
  set projectTitle(title) {
    this.#projectTitle = title;
  }
  get projectTitle() {
    return this.#projectTitle;
  }
  set projectDescription(desc) {
    this.#projectDescription = desc;
  }
  get projectDescription() {
    return this.#projectDescription;
  }
  set projectColor(color) {
    this.#projectColor = color;
  }
  get projectColor() {
    return this.#projectColor;
  }
  toJSON() {
    return {
      projectId: this.#projectId,
      projectTitle: this.#projectTitle,
      projectDescription: this.#projectDescription,
      projectColor: this.#projectColor,
    };
  }
}
