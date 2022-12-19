window.addEventListener('load', () => {
  const form = document.querySelector('#new-task-form'); 
  const list_el = document.querySelector('#tasks');
  const textName = document.querySelector('#textName')
  const textDescription = document.querySelector('#textDescription')
  const textAssign = document.querySelector('#textAssign')
  const dueDate = document.querySelector('#dueDate')
  
  form.addEventListener('submit', (e) => {
      e.preventDefault(); // prevents refreshing the page

      const taskName = textName.value;
      const taskDescription = textDescription.value;
      const taskAssign = textAssign.value;
      const taskDueDate = dueDate.value;
    
      if (!taskName || !taskDescription || !taskAssign || !taskDueDate) {
          alert('fill out tasks');
          return;
      } else {
        const task_content_el = document.createElement("div");
  
          task_content_el.classList.add('content');
          task_content_el.innerHTML = 
          `<div>
            Task Name: ${taskName} <br />
            Task Description: ${taskDescription} <br />
            Assign to: ${taskAssign} <br />
            Due date: ${taskDueDate}
          </div>` 
  
          list_el.appendChild(task_content_el);
      }
      
  });
});