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
  console.log('statusOption',statusOption)

  const errorEl = document.getElementById("error")

 
   const markDone = (event, el) => {
    event.preventDefault();
    const getTaskId = el.getAttribute("data-btn-id");
    console.log('task id: ' + getTaskId);
    const taskEl = document.querySelector("[data-task-id='" + getTaskId + "']");
    const doneEl = taskEl.querySelector(".mySpan");
    if(doneEl.length > 0) {
      // set local storate status to completed
    localStorage.get
    doneEl.classList.remove('bg-danger')
    doneEl.classList.add('bg-success')
    doneEl.textContent = 'DONE'
    }
   
   }


   const markDelete = (e) => {
    e.preventDefault();
    console.log('del event: ' + e)
    
   }

   const getTaskById = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
     return tasks.find(task => task.taskId = id)
   }

   const setTaskById = (id) =>{
      const getTask = getTaskById(id);
       
     
   }

   const getAllTasks  = () => {
    return JSON.parse(localStorage.getItem('tasks'));
   }



  const tasks =JSON.parse(localStorage.getItem('tasks')) || [];
  
  // add task 
  const addTask = (textName, textAssign, textDescription, dueDate, statusOption) => {
    tasks.push({
      taskId: Math.floor(Math.random() * 100), // will generate a unique id for each task
      textName,
      textAssign,
      textDescription,
      dueDate,
      statusOption // should be set automatically with task status
    })

    // stored data on client browser 
    localStorage.setItem('tasks', JSON.stringify(tasks))

    return { textName, textAssign, textDescription, dueDate, statusOption }
  }

  // create task 
  const createTaskElement = ({ taskId, textName, textAssign, textDescription, dueDate, statusOption }) => {
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
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add('btn', 'btn-danger', 'rounded-5', 'deleteBtn');

    const markBtn = document.createElement("button")
    markBtn.classList.add('btn', 'btn-success', 'rounded-5', 'markBtn');
    markBtn.setAttribute('data-btn-id', taskId)
    markBtn.setAttribute("onclick","markDone(event, this);");

    const date = new Date(dueDate);
      // human-readable code of the dueDate property
    const formattedDate = `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`;

    taskNameElement.textContent = `Task Name: ${textName}`      
    assignToElement.textContent = `Assign to: ${textAssign}`      
    taskDescriptionElement.textContent = `Task description: ${textDescription}`      
    dueDateElement.textContent = `Due date: ${formattedDate}`

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
    

    // delete task completely 
    const closes = document.querySelectorAll('.deleteBtn')

    // for (let i = 0; i< tasks.length; i++) {
    //   let task = tasks[i];
      
    //   if (task.id !== taskId) {
    //       tasks.push(task);
    //   }
    // }
    closes.forEach(close => {
      close.addEventListener('click',  removeObjectWithId(tasks, tasks.taskId))
    })


    // // mark as done 
    // const markButtons = document.querySelectorAll('.markBtn')
    //   markButtons.forEach( markButton => {
    //   markButton.addEventListener('click', () => {
    //     mySpan = document.querySelector('.mySpan')
    //     mySpan.classList.remove('bg-danger')
    //     mySpan.classList.add('bg-success')
    //     mySpan.textContent = 'DONE'
    //   })
    // })

    // 
    // const doneEl = document.querySelectorAll('.markBtn');
    // doneEl.addEventListener('click', (el) => {
    //   alert(el)
    //  }
    // )

    const markButtons = document.querySelectorAll('.markBtn')

    //console.log(markButtons)


    

  }
  submittedEl.style.display = tasks.length === 0 ? 'none' : 'block';

  tasks.forEach(createTaskElement)
  
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents refreshing the page

    let taskName = textName.value;
    let taskAssign = textAssign.value;
    let taskDescription = textDescription.value;
    let taskDueDate = dueDate.value;
    let status = statusOption.value;
    
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
        statusOption
        )
        createTaskElement(newTask)
        
       
      // reset all fiels 
      textName.value = "";
      textAssign.value = "";
      textDescription.value = "";
      dueDate.value = "";
    }
    
  })

  //Remove an Element from Array by ID
  function removeObjectWithId(tasks, id) {
    const objWithIdIndex = tasks.findIndex((obj) => obj.taskId === id);
  
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
  
    return tasks;
  }