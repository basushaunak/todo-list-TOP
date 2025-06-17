class TodoItems{
    #todoId ;
    #projectId ;
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
    constructor(id, project,title){
        this.#todoId = id;
        this.#projectId = project;
        this.#todoTitle = title;
    }
    get todoId(){
        return this.#todoId;
    }
    get projectId(){
        return this.#projectId;
    }
    set todoTitle(title){
        this.#todoTitle = title;
    }
    get todoTitle(){
        return this.#todoTitle;
    }
    set todoDescription(desc){
        this.#todoDescription = desc;
    }
    get todoDescription(){
        return this.#todoDescription;
    }
    set todoPriority(priority){
        this.#todoPriority = priority;
    }
    get todoPriority(){
        return this.#todoPriority;
    }
    set todoDueDate(dueDate){
        this.#todoDueDate = dueDate;
    }
    get todoDueDate(){
        return this.#todoDueDate;
    }
    set todoDueTime(dueTime){
        this.#todoDueTime = dueTime;
    }
    get todoDueTime(){
        return this.#todoDueTime;
    }
    set todoLocation(location){
        this.#todoLocation = location;
    }
    get todoLocation(){
        this.#todoLocation;
    }
    set todoNotes(notes){
        this.#todoNotes = notes;
    }
    get todoNotes(){
        return this.#todoNotes;
    }
    set todoParticipants(participantArray){
        this.#todoParticipants = participantArray;
    }
    get todoParticipants(){
        return this.#todoParticipants;
    }
    //add Participant
    addParticipant(participant){
        if(isDuplicate(this.#todoParticipants,participant)){
            return -1;
        }
        this.#todoParticipants.push(participant);
        return 0;
    }
    //remove Participant
    removeParticipant(participant){
        let tmp = this.#todoParticipants.filter(part=>part !== participant);
        this.#todoParticipants = tmp;
    }
    set todoCheckList(checkListArray){
        this.#todoCheckList = checkListArray;
    }
    get todoCheckList(){
        return this.#todoCheckList;
    }
    //add Checklist items
    addCheckList(checkListItem){
        if(isDuplicate(this.#todoCheckList,checkListItem)){
            return -1;
        }
        this.#todoCheckList.push(checkListItem);
        return 0;
    }
    //remove Checklist items
    removeCheckList(checkListItem){
        let tmp = this.#todoCheckList.filter(item => item !== checkListItem);
        this.#todoCheckList = tmp;
    }
    set todoIsCompleted(completed){
        this.#todoIsCompleted = completed;
    }
    get todoIsCompleted(){
        return this.#todoIsCompleted;
    }
}