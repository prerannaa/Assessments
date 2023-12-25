import './style.css';
import { Task } from './Task';
import { TaskList } from './TaskList';

const taskList = new TaskList();

function createTaskElement(task: Task): HTMLLIElement {
  const listItem = document.createElement('li');
  listItem.innerText = task.value;
  listItem.setAttribute('data-task-id', task.id);

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('checked');
    task.toggleCompleted();
  });

  const deleteButton = document.createElement('span');
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', () => {
    listItem.remove();
    taskList.removeTask(task.id);
  });

  listItem.appendChild(deleteButton);

  return listItem;
}

function createTask(value: string): Task {
  const task = new Task(value);
  taskList.addTask(task);
  return task;
}

function updateTaskListUI(taskList: TaskList) {
  const listContainer = document.getElementById('list-container');

  if (listContainer) {
    listContainer.innerHTML = '';

    taskList.list.forEach((task) => {
      const taskElement = createTaskElement(task);
      listContainer.appendChild(taskElement);
    });
  }
}


function search(taskList: TaskList, searchTerm: string = ''): void {
  taskList.list.forEach((task) => {
    const listItem = document.querySelector(`[data-task-id="${task.id}"]`) as HTMLLIElement;

    if (listItem) {
      const isVisible = task.value.toLowerCase().includes(searchTerm.toLowerCase());
      listItem.style.display = isVisible ? 'block' : 'none';
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.getElementById('input-box') as HTMLInputElement;
  const addButton = document.querySelector('button');

  if (addButton) {
    addButton.addEventListener('click', () => {
      const inputValue = inputBox.value.trim();

      if (inputValue !== '') {
        const newTask = createTask(inputValue);
        taskList.addTask(newTask);

        const taskElement = createTaskElement(newTask);

        const listContainer = document.getElementById('list-container');
        if (listContainer) {
          listContainer.appendChild(taskElement);
        }

        inputBox.value = ''; // Clear the input box after adding a task
      }
    });
  }

  const searchBox = document.getElementById('search-box') as HTMLInputElement;
  searchBox.addEventListener('input', () => {
    const searchTerm = searchBox.value.trim();
    search(taskList, searchTerm);
  });
  

  // Initial UI update
  updateTaskListUI(taskList);
});

