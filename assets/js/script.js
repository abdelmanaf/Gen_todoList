// Select elements 
  const form = document.querySelector('#new-task-form'); 
  const list_el = document.querySelector('#task');
  const textName = document.querySelector('#textName')
  const textDescription = document.querySelector('#textDescription')
  const textAssign = document.querySelector('#textAssign')
  const dueDate = document.querySelector('#dueDate')
  const submittedEl = document.querySelector('.submitted')

  const status = document.getElementById("status")

  const errorEl = document.getElementById("error")

 


  const tasks =JSON.parse(localStorage.getItem('tasks')) || [];
  
  // add task 
  const addTask = (textName, textAssign, textDescription, dueDate) => {
    tasks.push({
      textName,
      textAssign,
      textDescription,
      dueDate
    })

    // stored data on client browser 
    localStorage.setItem('tasks', JSON.stringify(tasks))

    return { textName, textAssign, textDescription, dueDate }
  }

  // create task 
  const createTaskElement = ({ textName, textAssign, textDescription, dueDate }) => {
    const task_content_el = document.createElement("div");

    // container with h3 and span elements 
    const h3SpanDiv = document.createElement("div");
    h3SpanDiv.classList.add('d-flex', 'w-100', 'mt-2', 'justify-content-between', 'align-items-center')
    const spanElement = document.createElement("span");
    spanElement.classList.add('badge', 'bg-danger')
    const taskNameElement = document.createElement("h3");

    // container with paragraphs 
    const paragraphsContainer = document.createElement("div");
    const assignToElement = document.createElement("p");
    const taskDescriptionElement = document.createElement("p");
    const dueDateElement = document.createElement("p");

    // container with buttons 
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add('d-flex', 'gap-3')
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add('btn', 'btn-danger', 'rounded-5');
    const markBtn = document.createElement("button")
    markBtn.classList.add('btn', 'btn-success', 'rounded-5');


    taskNameElement.textContent = `Task Name: ${textName}`      
    assignToElement.textContent = `Assign to: ${textAssign}`      
    taskDescriptionElement.textContent = `Task description: ${textDescription}`      
    dueDateElement.textContent = `Due date: ${dueDate}`

    spanElement.textContent = 'TODO'
    deleteBtn.textContent = 'Delete this task'
    markBtn.textContent = 'mark as done'

    task_content_el.classList.add('tasks');
    h3SpanDiv.append(taskNameElement, spanElement)
    paragraphsContainer.append(assignToElement, taskDescriptionElement, dueDateElement)
    buttonsContainer.append(deleteBtn, markBtn)

    task_content_el.append(h3SpanDiv ,paragraphsContainer, buttonsContainer)
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
        taskDueDate
        )
        createTaskElement(newTask)
        
       
      // reset all fiels 
      textName.value = "";
      textAssign.value = "";
      textDescription.value = "";
      dueDate.value = "";
    }
    
  })
  
