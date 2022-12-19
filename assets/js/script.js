window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form'); //keep
    const inputs = document.querySelectorAll('.form-control');
    const list_el = document.querySelector('#tasks');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevents refreshing the page
      
          inputs.forEach((input) => {
            console.log(input.value);
    
            const task = input.value;
            const task_content_el = document.createElement("div");
    
            task_content_el.classList.add('content');
            task_content_el.innerText = task; //set inner value to our task
    
            list_el.appendChild(task_content_el);
        });
      
        // if (!task) {
        //     alert('fill out tasks');
        //     return;
        // }
        
          });
    });