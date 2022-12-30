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
    const taskNameElement = document.createElement("h3");
    const assignToElement = document.createElement("p");
    const taskDescriptionElement = document.createElement("p");
    const dueDateElement = document.createElement("p");

    taskNameElement.textContent = `Task Name: ${textName}`      
    assignToElement.textContent = `Assign to: ${textAssign}`      
    taskDescriptionElement.textContent = `Task description: ${textDescription}`      
    dueDateElement.textContent = `Due date: ${dueDate}`

    task_content_el.classList.add('tasks');
    task_content_el.append(taskNameElement,assignToElement, taskDescriptionElement, dueDateElement)
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
        
        // submittedEl.classList.remove('submitted');
      // reset all fiels 
      textName.value = "";
      textAssign.value = "";
      textDescription.value = "";
      dueDate.value = "";
    }
    
  })
  
