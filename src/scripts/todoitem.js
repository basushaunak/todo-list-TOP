import { isDuplicate } from "./utils.js";

export class TodoItem {
  #todoId;
  #projectId;
  #todoTitle;
  #todoDescription;
  #todoPriority;
  #todoDueDate;
  #todoDueTime;
  #todoLocation;
  #todoNotes;
  #todoParticipants = [];
  #todoCheckList = [];
  #todoIsCompleted;
  constructor(id, project, title) {
    this.#todoId = id;
    this.#projectId = project;
    this.#todoTitle = title;
  }
  set todoId(id) {
    // Can't be changed

  }
  get todoId() {
    return this.#todoId;
  }
  set projectId(id) {
    this.#projectId = id;
  }
  get projectId() {
    return this.#projectId;
  }
  set todoTitle(title) {
    this.#todoTitle = title;
  }
  get todoTitle() {
    return this.#todoTitle;
  }
  set todoDescription(desc) {
    this.#todoDescription = desc;
  }
  get todoDescription() {
    return this.#todoDescription;
  }
  set todoPriority(priority) {
    //1 = low, 2 = medium 3 = high 4 = critical
    this.#todoPriority = priority;
  }
  get todoPriority() {
    return this.#todoPriority;
  }
  set todoDueDate(dueDate) {
    this.#todoDueDate = dueDate;
  }
  get todoDueDate() {
    return this.#todoDueDate;
  }
  set todoDueTime(dueTime) {
    this.#todoDueTime = dueTime;
  }
  get todoDueTime() {
    return this.#todoDueTime;
  }
  set todoLocation(location) {
    this.#todoLocation = location;
  }
  get todoLocation() {
    return this.#todoLocation;
  }
  set todoNotes(notes) {
    this.#todoNotes = notes;
  }
  get todoNotes() {
    return this.#todoNotes;
  }
  set todoParticipants(participantArray) {
    this.#todoParticipants = participantArray;
  }
  get todoParticipants() {
    return this.#todoParticipants;
  }
  //add Participant
  addParticipant(participant) {
    if (isDuplicate(this.#todoParticipants, participant)) {
      return -1;
    }
    this.#todoParticipants.push(participant);
    return 0;
  }
  //remove Participant
  removeParticipant(participant) {
    let tmp = this.#todoParticipants.filter((part) => part !== participant);
    if (tmp.length !== this.todoParticipants.length) {
      this.#todoParticipants = tmp;
      return 0;
    }
    return -1;
  }
  set todoCheckList(checkListArray) {
    this.#todoCheckList = checkListArray;
  }
  get todoCheckList() {
    return this.#todoCheckList;
  }
  //add Checklist items
  addCheckList(checkListItem) {
    if (isDuplicate(this.#todoCheckList, checkListItem)) {
      return -1;
    }
    this.#todoCheckList.push(checkListItem);
    return 0;
  }
  //remove Checklist items
  removeCheckList(checkListItem) {
    let tmp = this.#todoCheckList.filter((item) => item !== checkListItem);
    if (tmp.length !== this.#todoCheckList.length) {
      this.#todoCheckList = tmp;
      return 0;
    }
    return -1;
  }
  set todoIsCompleted(completed) {
    this.#todoIsCompleted = completed;
  }
  get todoIsCompleted() {
    return this.#todoIsCompleted;
  }
  toJSON() {
    return {
      todoId: this.#todoId,
      projectId: this.#projectId,
      todoTitle: this.#todoTitle,
      todoDescription: this.#todoDescription,
      todoPriority: this.#todoPriority,
      todoDueDate: this.#todoDueDate,
      todoDueTime: this.#todoDueTime,
      todoLocation: this.#todoLocation,
      todoNotes: this.#todoNotes,
      todoParticipants: this.#todoParticipants,
      todoCheckList: this.#todoCheckList,
      todoIsCompleted: this.#todoIsCompleted,
    };
  }
}
