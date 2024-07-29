//find elements on the page,найти элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}



checkEmptyList();

//add tasks,добавление задачи
form.addEventListener('submit', addTask);

//delete tasks,удаление задачи
tasksList.addEventListener('click', delateTask);

//mark the task 'done',отмечаем задачу завершенной

tasksList.addEventListener('click', doneTask)

//functions, функции
function addTask (event) {
 //cancel submitting the form,отменить отправку формы
 event.preventDefault()
  

 //get the task text from the input field, достаем текст задачи из поля ввода
 
 const taskText = taskInput.value

 //describe the task as an object,описываем задачу в виде объекта
 const newTask = {
 
    id: Date.now(),
    text: taskText,
    done: false,
 };
 

 //add a task to the task array,добавляем задачу в массив с задачами

  tasks.push(newTask);

//save the task list in the browser's localStorage,сохраняем список задач в хранилище браузера localStorage
  saveToLocalStorage()

 renderTask(newTask);
 
 //clear the input field and return focus to it, очищаем поле ввода и возвращаем на него фокус
 
 taskInput.value = ""
 taskInput.focus()
 checkEmptyList();
 
}

function delateTask(event){
    //We check if the click was not on the 'delete task' button,проверяем если клик был по не по кнопке' удалить задачу'

    if (event.target.dataset.action !== 'delete')return

      const parenNode = event.target.closest('.list-group-item');

//determine the conception ID,определяем ID зачачи
const id = Number(parenNode.id);

//find the task index in the array,находим индекс задачи в массиве
const index = tasks.findIndex ((task) => task.id === id);

//remove a task from the task array,удаляем задачу из массива с задачами
tasks.splice(index, 1)

//save the task list in the browser's localStorage,сохраняем список задач в хранилище браузера localStorage
saveToLocalStorage()

//removing task ID,удаляем  ID задачи
      parenNode.remove()

      checkEmptyList();
}

function doneTask (event) {
    
    //check that the click wasn't on the 'task completed' button,проверяем что клик был не по кнопке 'задача выполнена'

    if (event.target.dataset.action !== "done")return 

    //check that the click was on the 'task completed' button,проверяем что клик был по кнопке 'задача выполнена'
        const parentNode = event.target.closest('.list-group-item');

//determine task ID,определяем ID задачи

const id = Number(parentNode.id);

const task = tasks.find( (task) => task.id === id);

task.done = !task.done

//save the task list in the browser's localStorage,сохраняем список задач в хранилище браузера localStorage
saveToLocalStorage()

 const taskTitle = parentNode.querySelector('span');
 taskTitle.classList.toggle('task-title--done')
    
}

function checkEmptyList() {

    if (tasks.length === 0) {
const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
<div class="empty-list__title">To-do list is empty</div>
</li>`;

tasksList.insertAdjacentHTML('afterbegin' , emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
      //forming a CSS class,формируем CSS класс
  const cssClass = task.done ? 'task-title task-title--done' : 'task-title'
  //Generated markup for a new task,Формируемая разметка для новой задачи
  
  const taskHTML = `
  <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${cssClass}">${task.text}</span>
  <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
  
  </div>
  
  </li>
  `
  //add a task to the page,добавляем задачу на страницу
  
  tasksList.insertAdjacentHTML('beforeend',taskHTML);

}