window.addEventListener('load', () => {
  const form = document.querySelector('#new-task-form'); 
  const list_el = document.querySelector('#task');
  const textName = document.querySelector('#textName')
  const textDescription = document.querySelector('#textDescription')
  const textAssign = document.querySelector('#textAssign')
  const dueDate = document.querySelector('#dueDate')
  const submittedEl = document.querySelector('.submitted')

  const status = document.getElementById("status")

  const errorEl = document.getElementById("error")

 


  const tasks = [];
  
  const addTask = (textName, textDescription, textAssign, dueDate) => {

  }

  

  form.addEventListener('submit', (e) => {
      e.preventDefault(); // prevents refreshing the page

      let taskName = textName.value;
      let taskDescription = textDescription.value;
      let taskAssign = textAssign.value;
      let taskDueDate = dueDate.value;
    
      if (!taskName || !taskDescription || !taskAssign || !taskDueDate) {
          let error = document.createElement('div')
          error.innerHTML = 
            `<div class="mt-4 alert alert-danger">! Please all fields must be filled out  !!</div>
            `
          errorEl.appendChild(error)
      } else {
        const task_content_el = document.createElement("div");

        const taskNameElement = document.createElement("h5");
        const taskDescriptionElement = document.createElement("p");
        const assignToElement = document.createElement("p");
        const dueDateElement = document.createElement("p");

        taskNameElement.textContent = `Task Name: ${taskName}`      
        taskDescriptionElement.textContent = `Task description: ${taskDescription}`      
        assignToElement.textContent = `Assign to: ${taskAssign}`      
        dueDateElement.textContent = `Due date: ${taskDueDate}`
 
        task_content_el.classList.add('tasks');
        task_content_el.append(taskNameElement, taskDescriptionElement, assignToElement, dueDateElement)
        list_el.appendChild(task_content_el);
      }
      submittedEl.classList.remove('submitted');
  });
});