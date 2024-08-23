import './styles.css'

const defaultDate = new Date()
defaultDate.setDate(defaultDate.getDate()+1)

const dashboard = document.querySelector(".fa-map-o")
const sidebar = document.querySelector(".sidebar")
dashboard.addEventListener("click", function(){
    sidebar.classList.toggle("active")
})

let targetEdit;
let todayComplete = 0
let tomorrowComplete =0;
let weekComplete = 0;
let allComplete =0;
let projectGimmick;
let targetSub;
const modalPriority = document.getElementById('priority')
const modalName = document.getElementById("name")
const modalDesc = document.getElementById("desc")
const modalDate = document.getElementById("date")
const closeButton = document.getElementById("closeButton")
const modal = document.getElementById("modal")
const overlay = document.getElementById("overlay")
const newTask = document.querySelector(".newTask")
const title = document.querySelector(".title")
const modalButton = document.querySelector(".modalButton")
const removeButton = document.querySelector('.fa-trash')
const caution = document.getElementById("caution")
const keepTask = document.querySelector('.keepTask')
const deleteTask = document.querySelector('.deleteTask')
const completedButton = document.getElementById("completed")
const todayButton = document.getElementById("today")
const tomoButton = document.getElementById("tomo")
const weeklyButton = document.getElementById("thisWeek")
const plannedButton = document.getElementById("planned")
const completeCounter = document.querySelector(".completed")
const pendingCounter = document.querySelector(".pending")
const projectCreator = document.getElementById('projectCreator')
const cancel = document.querySelector(".cancel")
const add = document.querySelector(".add")
const addProject = document.getElementById('addProject')
const message = document.createElement("span")
const projectInput = document.getElementById('projectInput')
const assignment = document.querySelector(".assignment")
const editPanel = document.getElementById('projectEdit')
const done = document.getElementById('done')
const nameEdit = document.getElementById('nameEdit')
const removeGoal = document.getElementById('removeGoal')
const saveButton = document.getElementById('saveButton')
const goalCreator = document.getElementById('goalCreator')
const addGoal = document.getElementById("addGoal")
const deleteButton = document.getElementById("delete")
const projectTrash = document.getElementById('projectTrash')
const subGoalSave = document.getElementById('subGoalSave')
const subgoalName = document.getElementById('subgoalName')
const tinyModal = document.querySelector('.tinyModal')
message.textContent = "Looks like this category is empty!"
message.id = 'message'


projectCreator.addEventListener('click',projectPop)
cancel.addEventListener('click',projectPop)

function projectPop(){
    projectInput.value = ''
    overlay.classList.toggle('active')
    addProject.classList.toggle('active')
}

deleteButton.addEventListener("click", function(){
    deleteSubGoal(removeGoal.value,targetEdit)
    panelLoader();
})

function nameToggle(){
    tinyModal.classList.toggle('active')
    overlay.classList.toggle('active')
    subgoalName.value = targetSub;
}

subGoalSave.addEventListener('click',function(){
    if(subgoalName.value==''){
        alert('enter a name')
    }
    else{
        let targetProject = projectList.projects.find(t=>t.name = targetEdit)
        let targetChange = targetProject.subGoals.find(t=>t.name = targetSub)
        targetChange.name = subgoalName.value;
        displayProject(targetEdit)
    }
    nameToggle()
})

projectTrash.addEventListener('click', function(){
    deleteProject(targetEdit);
    projectEditor();
    assignmentHandler();
    allRender();
    
})

saveButton.addEventListener('click', function(){
    if(nameEdit.value ===''){
        alert("enter a name!")
        panelLoader()
    }
    else{
    let targetProject = projectList.projects.find(t=>t.name = targetEdit)
    targetProject.name = nameEdit.value;
    targetEdit = targetProject.name
    panelLoader(nameEdit.value)
    }
})

goalCreator.addEventListener('click',function(){
    if(addGoal.value===''){
        alert("Enter a name!")
    }
    else{
        createSubGoal(addGoal.value,targetEdit)
    }
    panelLoader()
})

done.addEventListener('click', function(){
    projectEditor();
})

closeButton.addEventListener("click",function(){
    toolbarToggle();
})
newTask.addEventListener("click",function(){
    toolbarToggle('new')
})

add.addEventListener("click",projectHandler)

todayButton.addEventListener('click',function(){
    todayRender();
})

tomoButton.addEventListener('click',function(){
    tomoRender();
})

weeklyButton.addEventListener('click',function(){
    weekRender();
})

plannedButton.addEventListener("click",function(){
    allRender();
})

completedButton.addEventListener('click', function(){
    displayComplete();
})

removeButton.addEventListener('click',function(){
    let condition = title.textContent;
    if(condition==="Edit Task"){
    caution.classList.toggle('active')
    overlay.style.zIndex = '58'
    }
})

keepTask.addEventListener("click",function(){
    caution.classList.toggle('active')
    overlay.style.zIndex = '9'
})

deleteTask.addEventListener('click',function(){
    if(projectGimmick){
        deleteSubTask(targetTask,targetSub,targetEdit);
    }
    else{
    taskInstance.removeTask(targetTask)
    }
    caution.classList.toggle('active')
    overlay.style.zIndex = '9'
    toolbarToggle();
})

let projectList = {
    projects: []
}

let completed = []

export function addToList(name, description, due, imp, array)
{
    const newTask = new Task(name,description,due,imp)
    array.push(newTask);
}

class Task{
    constructor(name,description,due, importance)
    {
        this.name = name
        this.description = description
        this.due = due
        this.importance = importance
        this.valuePoint = priorityCheck(this.due,this.importance)
    }
}

export function generalTask(){
    let generalList = [];

    const setList = (value) => {
        generalList = value;
    }
    const viewTasks =()=>{
       return generalList;
    }
    const createTask = (name, description, due, imp)=>{
        if(!due){
            due = defaultDate.toISOString().split('T')[0];
        }
        if(imp===''){
            imp = 'low'
        }
        if(name===''){
            alert("Please name your task")
        }
        else{
            addToList(name, description, due, imp, generalList);
            displayList(generalList,'Planned Tasks')
        }
        saveToStorage();
    }
    const editTask = (oldName, updates) =>{
        const task = generalList.find(t => t.name === oldName)
        if(task){
            if(updates.name===''){
                alert('enter a name')
                updates.name= oldName;
            }
            if(isNaN(modalDate)){
                updates.due = defaultDate
            }
            if(!modalPriority){
                updates.importance = 'low';
            }
            if(updates.name && updates.name!== oldName){
                let condition = generalList.find(t=> t.name == updates.name)
                if(!condition){
                Object.assign(task, updates)            
                }
                else{
                    alert("enter unique name")
                }
            }
            else{
                Object.assign(task, updates)  
            }
        }
        allRender();
        saveToStorage()
    }

    const removeTask =(name)=>{
        let targetIndex = generalList.findIndex(t=>t.name === name)
        generalList.splice(targetIndex,1)
        allRender();
        saveToStorage()
    }

    return{editTask, createTask, viewTasks, removeTask, setList}
}

export function createProject(projectName){
    let project = projectList.projects.find(p => p.name === projectName);
    if(!project){
        if(projectName===''){
            alert("Enter project name!")
        }
        else{
            const newProject = {
            name: projectName,
            subGoals: []
        }
        projectList.projects.push(newProject)
        saveToStorage();
    };
    }
    else{
        alert('Project already exists!')
    }
   
}

function createSubGoal(subGoalName, projectName){
    const newSubGoal = {
        name: subGoalName,
        tasks: []
    }
    let targetProject = projectList.projects.find(t=>t.name==projectName)
    let existingSubGoal = targetProject.subGoals.find(t=> t.name==subGoalName)
    if(existingSubGoal == undefined){
    targetProject.subGoals.push(newSubGoal)
    saveToStorage();
    }
    else{
        alert('Subgoal with this name already exists!!')
    }
}

function deleteSubGoal(subGoalName, projectName){
    let targetProject = projectList.projects.find(t=> t.name ==projectName)
    let targetSubGoalIndex = targetProject.subGoals.findIndex(t=> t.name == subGoalName)
    if(targetSubGoalIndex!=undefined){
    targetProject.subGoals.splice(targetSubGoalIndex,1);
    saveToStorage();
    }
}

function deleteSubTask(taskName, subGoalName, projectName){
    let targetProject = projectList.projects.find(t=> t.name ==projectName)
    let targetSubGoal = targetProject.subGoals.find(t=> t.name == subGoalName)
    let targetTaskIndex = targetSubGoal.tasks.findIndex(t=>t.name = taskName);
    if(targetTaskIndex!=undefined){
        targetSubGoal.tasks.splice(targetTaskIndex,1)
        saveToStorage();
    }
    displayProject(targetEdit)
}


function deleteProject(projectName){
    let targetProjectIndex = projectList.projects.findIndex(t=> t.name==projectName)
    projectList.projects.splice(targetProjectIndex,1)
    saveToStorage();
}

function addToSubGoal(projectName,subGoal,taskName,taskDescription,taskDue,taskImp){
    if(!taskDue){
        taskDue = defaultDate.toISOString().split('T')[0];
    }
    if(taskImp===''){
        taskImp = 'low'
    }
    if(taskName===''){
        alert("Please name your task")
    }
    else{
    const newTask = {
        name: taskName,
        description: taskDescription,
        due: taskDue,
        importance: taskImp,
        valuePoint: priorityCheck(taskDue, taskImp)
    }
    console.log(taskDue,taskImp,priorityCheck(taskDue,taskImp))
    let targetProject = projectList.projects.find(t=>t.name ==projectName)
    if(targetProject){
        const goal = targetProject.subGoals.find(sg => sg.name ===subGoal)
        if(goal){
            goal.tasks.push(newTask)
            saveToStorage();
        }
}
    }
}

function editProjectTask(projectName,subGoal, name, updates){
    const targetProject = projectList.projects.find(t=>t.name===projectName)
    const goal = targetProject.subGoals.find(sg => sg.name === subGoal)
    const task = goal.tasks.find(t => t.name === name)
    if(task){
    Object.assign(task, updates)
    saveToStorage();
}
}

function daysToGo(date){
    const today = new Date();
    today.setHours(0,0,0,0)
    const thatDay = new Date(date);
    thatDay.setHours(0,0,0,0)
    const timeDifference = thatDay.getTime() - today.getTime()
    const dayDifference = Math.floor(timeDifference/(24*3600*1000))
    if(dayDifference<=0){
        return ("DUE")
    }
    return (dayDifference+" days left");
    
}

function priorityCheck(date,imp){
    let daysLeft = daysToGo(date).split('')[0]
    console.log(daysLeft)
    console.log(imp)
    if(daysLeft==0){
        daysLeft = 0.1;
    }
    var value;
    var valuePoint;
    if(imp =='urgent'){
        value = 30;
    }
    else if(imp =='high'){
        value = 20;
    }
    else if(imp =='medium'){
        value = 15;
    }
    else if(imp=="low"){
       value = 7;
    }
    valuePoint = (value + (30-daysLeft))/2
    if(daysLeft>30){
        valuePoint = 0
    }
    return valuePoint;
}

export function dailyList(arrayList){
    let todayList = []
    const today = new Date()
    today.setHours(0,0,0,0)
    arrayList.forEach(element => {
        const dueDate = new Date(element.due);
        dueDate.setHours(0,0,0,0)
        if(dueDate.getTime()==today.getTime()){
            todayList.push(element);
        }
    });
    return todayList;
}

export function tomorrowList(arrayList){
    let tomorrowTasks = []
    const tomorrow = new Date()
    tomorrow.setHours(0,0,0,0)
    tomorrow.setDate(tomorrow.getDate() + 1);   
    arrayList.forEach(element => {
        const dueDate = new Date(element.due);
        dueDate.setHours(0,0,0,0)
        if(dueDate.getTime()===tomorrow.getTime()){
            tomorrowTasks.push(element);
        }
    });
    return tomorrowTasks;
}

export function weekList(arrayList){
    let weeklyTasks = [];
    const today = new Date()
    const startOfWeek = new Date(today)
    const endOfWeek = new Date(today)
    startOfWeek.setHours(0,0,0,0);
    startOfWeek.setDate(today.getDate()-today.getDay())
    endOfWeek.setHours(23,59,59,999)
    endOfWeek.setDate(startOfWeek.getDate()+6)
    arrayList.forEach(element => {
        const dueDate = new Date(element.due)
        let weekTaskCondition = dueDate>=startOfWeek && dueDate<=endOfWeek;
        if(weekTaskCondition){
            weeklyTasks.push(element)
        }
    });
    return weeklyTasks;
}

export function commonTasks(listGeneral){
    let commonList = []
    listGeneral.forEach(element => {
        commonList.push(element)
    });
    
    projectList.projects.forEach(project => {
        project.subGoals.forEach(goal => {
            goal.tasks.forEach(task => {
                commonList.push(task)
            });
        });
    });

    return commonList
}

export function sort(arrayList){
    return arrayList.sort((a,b)=>{
        let dateA = new Date(a.due);
        let dateB = new Date(b.due);
        return dateA - dateB;
    });
}

export function sortValue(arrayList){
    return arrayList.sort((a,b)=>{
        return b.valuePoint - a.valuePoint
    })
}

function completeHandler(task,project,subGoal){
    const vital = document.getElementById("vital")
    if(!project){
        let completedTask = taskInstance.viewTasks().find(t=>t.name===task)
        completed.push(completedTask)
        taskInstance.removeTask(task)
        if(vital.textContent=="Today"){
            todayComplete++
            allComplete++
        }
        else if(vital.textContent=="Tomorrow"){
            tomorrowComplete++
            allComplete++
        }
        else if(vital.textContent=="This Week"){
            weekComplete++
            allComplete++
        }
        else if(vital.textContent =="Planned Tasks"){
            ++allComplete
        }
        allRender();
    }
}



/*GRAPHIC JS FILE CONTENT */

let targetTask;

function projectEditor(name){
    editPanel.classList.toggle("active");
    overlay.classList.toggle('active')
    if(name!=undefined){
        targetEdit = name;
        panelLoader(name);
    }
}

function panelLoader(name){
    nameEdit.value = ''
    if(name==undefined){
        name = targetEdit
    }
    nameEdit.value = name;
    addGoal.value = '';
    let targetProject = projectList.projects.find(t=> t.name == name)
    removeGoal.innerHTML = ``
    targetProject.subGoals.forEach(goal => {
        removeGoal.innerHTML+=`<option value =${goal.name}>${goal.name}</option>`
    });
    displayProject(targetEdit);
}

function assignmentHandler(){
    assignment.innerHTML=''
    projectList.projects.forEach(project => {
        console.log('proju')
        let newProject = document.createElement("li")
        newProject.id = project.name
        newProject.textContent = project.name
        assignment.appendChild(newProject)
        newProject.addEventListener("click",function(){
            displayProject(project.name)
        })
    });
}

function projectHandler(){
    let projectName = projectInput.value;
    createProject(projectName);
    assignmentHandler();
    projectPop();
}

function todayRender(){
    counterEnable()
    let finalList = commonTasks(taskDisplay);
    let todayDisplay = dailyList(finalList);
    displayList(todayDisplay, 'Today')
    pendingCounter.textContent = `Pending: ${todayDisplay.length}`
    completeCounter.textContent = `Completed: ${todayComplete}`
    projectGimmick = false;
}

function allRender(){
    counterEnable()
    let finalList = commonTasks(taskDisplay)
    displayList(finalList,"Planned Tasks")
    pendingCounter.textContent = `Pending: ${finalList.length}`
    completeCounter.textContent = `Completed: ${allComplete}`
    projectGimmick = false;
    assignmentHandler();
}

function tomoRender(){
    counterEnable()
    let finalList = commonTasks(taskDisplay);
    let tomoDisplay = tomorrowList(finalList);
    displayList(tomoDisplay,'Tomorrow')
    pendingCounter.textContent = `Pending: ${tomoDisplay.length}`
    completeCounter.textContent = `Completed: ${tomorrowComplete}`
    projectGimmick = false;
}

function weekRender(){
    counterEnable()
    let finalList = commonTasks(taskDisplay);
    let weekDisplay = weekList(finalList);
    displayList(weekDisplay, "This Week")
    pendingCounter.textContent = `Pending: ${weekDisplay.length}`
    completeCounter.textContent = `Completed: ${weekComplete}`
    projectGimmick = false;
}

function toolbarToggle(option){
    modal.classList.toggle("active")
    overlay.classList.toggle("active")
    if(option=='new'){
        modalName.value = ''
        modalDesc.value = ''
        modalDate.value = ''
        modalPriority.value = ''
        title.textContent = "+New Task"
        modalButton.textContent = "Add Task"

    }
    else if(option=='edit'){
        title.textContent = 'Edit Task'
        modalButton.textContent ="Update Task"
    }
}

export function toolbarDisplay(name,desc,date,imp){
    let due = new Date(date);
    let formattedDate = due.toISOString().split('T')[0];
    modalName.value = name;
    targetTask = name;
    modalDesc.value = desc;
    modalPriority.value = imp;
    modalDate.value = formattedDate;
    toolbarToggle('edit')
}

modalButton.addEventListener("click", function(){
    if(modalButton.textContent==="Update Task"){
        let modifyObject = {
            name: modalName.value,
            description: modalDesc.value,
            due: modalDate.value,
            importance:modalPriority.value
        }
        if(projectGimmick){
            editProjectTask(targetEdit,targetSub,targetTask,modifyObject);
            displayProject(targetEdit);
            toolbarToggle();
        }
        else{
        taskInstance.editTask(targetTask,modifyObject)
        toolbarToggle()
        }
    }
    else if(modalButton.textContent==='Add Task'){
        if(projectGimmick){
            addToSubGoal(targetEdit,targetSub,modalName.value,modalDesc.value,modalDate.value,modalPriority.value)
            displayProject(targetEdit);
            toolbarToggle();
        }
        else{
        taskInstance.createTask(modalName.value,modalDesc.value,modalDate.value,modalPriority.value)
        toolbarToggle()
        }
    }
})

function counterEnable(){
    pendingCounter.style.display = 'flex'
    completeCounter.style.display = 'flex'
}

export function displayProject(name){
    projectGimmick = true;
    pendingCounter.style.display = 'none'
    completeCounter.style.display = 'none'
    const content = document.querySelector(".content")
    content.innerHTML = ""
    content.innerHTML = `<div class="projectName">
        ${name}
        <i class="fa fa-info-circle"> </i>
        </div>`
        const projectInfo = document.querySelector(".fa-info-circle")
        projectInfo.addEventListener('click',function(){
            projectEditor(name)
        })
    let project = projectList.projects.find(p=> p.name === name)
    let goList = project.subGoals
    if(goList.length==0){
        let message = document.createElement("span")
        message.textContent = "Add your first sub goal"
        message.id = 'message'
        content.appendChild(message)
    }
    goList.forEach(subGoal => {
        let divGoal = document.createElement('div')
        divGoal.className = "subGoal"
        divGoal.innerHTML = `${subGoal.name} <div class = "edit">
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        </div>`
        const plusSquare = divGoal.querySelector(".fa-plus-square-o")
        plusSquare.addEventListener('click',function(){
            targetSub = subGoal.name
            toolbarToggle('new')
        })
        const pencilSquare = divGoal.querySelector(".fa-pencil-square-o")
        pencilSquare.addEventListener('click',function(){
            targetSub = subGoal.name;
            nameToggle();
        })
        let taskList = subGoal.tasks
        taskList.forEach(task => {
            let exist = true;
            let taskCard = document.createElement("div")
            taskCard.className = "task";
            taskCard.innerHTML = `<div class="details">
                    <button class="check"></button>
                    ${task.name}
                </div>
                <div class="date">
                ${daysToGo(task.due)}</div>`
                taskCard.querySelector('.check').addEventListener("click",function(){
                    completed.push(task)
                    subGoal.tasks.splice((subGoal.tasks.findIndex(t=> t.name==task.name)),1)
                    displayProject(name);
                    exist = false
                })
                taskCard.addEventListener('click',function(){
                    if(exist){
                    toolbarDisplay(task.name,task.description, task.due,task.importance)
                    }
                })
                divGoal.appendChild(taskCard)
        });
        content.appendChild(divGoal)
    });
}


export function displayList(list,name){
    let content = document.querySelector(".content")
    content.innerHTML=``;
    let title = document.createElement("div")
    title.className = "title"
    title.id = 'vital'
    title.innerHTML = `${name}`
    content.appendChild(title)
    if(list.length==0){
        content.appendChild(message)
    }
    else{
    list.forEach(task => {
        let exist = true;
        let taskCard = document.createElement("div")
        taskCard.className = "task";
        taskCard.innerHTML = `<div class="details">
                <button class="check"></button>
                ${task.name}
            </div>
            <div class="date">
            ${daysToGo(task.due)}</div>`
            content.appendChild(taskCard)
            taskCard.querySelector('.check').addEventListener("click",function(){
                completeHandler(task.name)
                exist = false
            })
            taskCard.addEventListener('click',function(){
                if(exist){
                toolbarDisplay(task.name,task.description, task.due,task.importance)
                }
            })
    });
    }
}


function saveToStorage() {
    localStorage.setItem('projects', JSON.stringify(projectList));
    
    localStorage.setItem('list', JSON.stringify(taskInstance.viewTasks()));
}

function loadFromStorage() {
    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    if (savedProjects) {
        projectList = savedProjects;
        console.log(projectList)
    } else {
        projectList = { projects: [] };
    }

    const savedTasks = JSON.parse(localStorage.getItem('list'));
    if (savedTasks) {
        taskInstance.setList(savedTasks);
    }
}


export function displayComplete(){
    let content = document.querySelector(".content")
    content.innerHTML = '';
    let title = document.createElement('div')
    title.className = "title"
    title.innerHTML= `Completed tasks`
    content.appendChild(title)
    if(completed.length==0){
        content.appendChild(message)
    }
    completed.forEach(task => {
        let taskCard = document.createElement('div')
        taskCard.className = "task";
        taskCard.innerHTML = `${task.name}
        <div class = "date">${task.due}</div>`
        content.appendChild(taskCard);
    });
}

let taskInstance = generalTask();
loadFromStorage()
let taskDisplay = taskInstance.viewTasks();
allRender();

assignmentHandler();