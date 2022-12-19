
window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form'); //keep
    const input = document.querySelector('.form-control');
    const list_el = document.querySelector('#tasks');



    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevents refreshing the page

        const task = input.value;
        
        // if (!task) {
        //     alert('fill out tasks');
        //     return;
        // } 

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement("div");
        task_content_el.classList.add('content');

        task_content_el.innerText = task; //set inner value to our task

        task_el.appendChild(task_content_el);

        list_el.appendChild(task_el);

        // inputs.forEach((input) => {
        //     inputs.addEventListener('click', () => {
        //       console.log("forEach worked");
        //       task_el.appendChild(task_content_el);
        //     });
          });
    });







