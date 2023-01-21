// Select elements 
const form = document.querySelector('#new-task-form');
const list_el = document.querySelector('#task');
const textName = document.querySelector('#textName')

const textDescription = document.querySelector('#textDescription')
const textAssign = document.querySelector('#textAssign')
const dueDate = document.querySelector('#dueDate')
const submittedEl = document.querySelector('.submitted')
const selectElement = document.querySelector('#statusControl');
const statusOption = selectElement.options[selectElement.selectedIndex].value;

const errorEl = document.getElementById("error")


const markDone = (e, el) => {
  e.preventDefault();
  const getTaskId = el.getAttribute("data-btn-id");
  console.log('task id: ' + getTaskId);
  const taskEl = document.querySelector("[data-task-id='" + getTaskId + "']");
  const doneEl = taskEl.querySelector(".mySpan");
  if (doneEl.textContent === 'TODO') {
    // set local storate status to completed

   updateTaskStatusToDone(parseInt(getTaskId))

    doneEl.classList.remove('bg-danger')
    doneEl.classList.add('bg-success')
    doneEl.textContent = 'DONE'
  }

}


const markDelete = (e) => {
  e.preventDefault();
  const getTaskId = e.target.getAttribute("data-del-id");
  const taskEl = document.querySelector("[data-task-id='" + getTaskId + "']");
  taskEl.remove();
  deleteTaskById(getTaskId)
}

const updateTaskStatusToDone = (id) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log('id', typeof id)
  console.log('tasks', tasks)
  const task = tasks.find(task => task.taskId === parseInt(id));
  console.log('task', task)
  task.statusOption = 'done';
  localStorage.setItem('tasks', JSON.stringify(tasks));
 
}

const deleteTaskById = (id) => {

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (tasks.length > 0) {
    // find the task by id
    const task = tasks.find(task => task.taskId === parseInt(id));
    // remove the task from the array
    tasks.splice(tasks.indexOf(task), 1);
    // update the local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// add task 
const addTask = (textName, textAssign, textDescription, dueDate, statusOption) => {
  const taskId = Math.floor(Math.random() * 100);
  tasks.push({
    taskId, // will generate a unique id for each task
    textName,
    textAssign,
    textDescription,
    dueDate,
    statusOption // should be set automatically with task status
  })

  // stored data on client browser 
  localStorage.setItem('tasks', JSON.stringify(tasks))

  return {
    taskId,
    textName,
    textAssign,
    textDescription,
    dueDate,
    statusOption
  }
}

// create task 
const createTaskElement = ({
  taskId,
  textName,
  textAssign,
  textDescription,
  dueDate,
  statusOption
}) => {
  console.log('task id: ' + taskId)
  const task_content_el = document.createElement("div");
  // task id to the content element 
  task_content_el.setAttribute('data-task-id', taskId)
  // container with h3 and span elements 
  const h3SpanDiv = document.createElement("div");
  h3SpanDiv.classList.add('d-flex', 'w-100', 'mt-2', 'justify-content-between', 'align-items-center')
  const spanElement = document.createElement("span");
  statusOption === 'todo' && spanElement.classList.add('mySpan', 'badge', 'bg-danger')
  statusOption === 'done' && spanElement.classList.add('myspan', 'badge', 'bg-success')
  const taskNameElement = document.createElement("h3");

  // container with paragraphs 
  const paragraphsContainer = document.createElement("div");
  const assignToElement = document.createElement("p");
  const taskDescriptionElement = document.createElement("p");
  const dueDateElement = document.createElement("p");

  // container with buttons 
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add('d-flex', 'gap-3')
  // add delete button element
  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add('btn', 'btn-danger', 'rounded-5', 'deleteBtn');
  deleteBtn.setAttribute('data-del-id', taskId)
  deleteBtn.setAttribute("onclick", "markDelete(event, this);");
  // set mark done button element 
  const markBtnEl = document.createElement("button")
  markBtnEl.setAttribute('data-btn-id', taskId)
  markBtnEl.classList.add('btn', 'btn-success', 'rounded-5', 'markBtn');
  markBtnEl.setAttribute("onclick", "markDone(event, this);");
  console.log('markBtnEl', markBtnEl)

  const date = new Date(dueDate);
  // human-readable code of the dueDate property
  const formattedDate = `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`;

  taskNameElement.textContent = `Task Name: ${textName}`
  assignToElement.textContent = `Assign to: ${textAssign}`
  taskDescriptionElement.textContent = `Task description: ${textDescription}`
  dueDateElement.textContent = `Due date: ${formattedDate}`

  spanElement.textContent = 'TODO'
  deleteBtn.textContent = 'Delete this task'
  markBtnEl.textContent = 'mark as done'

  task_content_el.classList.add('tasks');
  h3SpanDiv.append(taskNameElement, spanElement)
  paragraphsContainer.append(assignToElement, taskDescriptionElement, dueDateElement)
  buttonsContainer.append(deleteBtn, markBtnEl)

  task_content_el.append(h3SpanDiv, paragraphsContainer, buttonsContainer)
  list_el.appendChild(task_content_el);

  submittedEl.style.display = tasks.length === 0 ? 'none' : 'block';

}

submittedEl.style.display = tasks.length === 0 ? 'none' : 'block';

tasks.forEach(createTaskElement)

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevents refreshing the page

  let taskName = textName.value;
  let taskAssign = textAssign.value;
  let taskDescription = textDescription.value;
  let taskDueDate = dueDate.value;
  let status = statusOption.value || 'todo';

  if (!taskName || !taskDescription || !taskAssign || !taskDueDate) {
    let error = document.createElement('div')
    error.innerHTML =
      `<div class="mt-4 alert alert-danger"> Please all fields must be filled out  !!</div>
        `
    errorEl.appendChild(error)

  } else {

    const newTask = addTask(
      taskName,
      taskAssign,
      taskDescription,
      taskDueDate,
      status
    )
    createTaskElement(newTask)

    // reset all fiels 
    textName.value = "";
    textAssign.value = "";
    textDescription.value = "";
    dueDate.value = "";
  }

})
