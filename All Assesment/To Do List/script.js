
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");
  
  var taskText = taskInput.value;

  if (taskText !== "") {
    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
      if (checkbox.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
      filterTasks();
    });

    var textNode = document.createTextNode(taskText);
    li.appendChild(checkbox);
    li.appendChild(textNode);
    taskList.appendChild(li);

    taskInput.value = "";
5
    filterTasks();
  } else {
    alert("Please enter a task!");
  }
}

function filterTasks(filterType) {
  var tasks = document.getElementById("taskList").getElementsByTagName("li");

  Array.from(tasks).forEach(function(task) {
    var isCompleted = task.classList.contains("completed");
    switch (filterType) {
      case "completed":
        task.style.display = isCompleted ? "block" : "none";
        break;
      case "remaining":
        task.style.display = isCompleted ? "none" : "block";
        break;
      default:
        task.style.display = "block";
        break;
    }
  });
}


function searchTasks() {
  var input, filter, ul, li, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById('taskList');
  li = ul.getElementsByTagName('li');

  let found = false;
  Array.from(li).forEach(function(task) {
    txtValue = task.textContent || task.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      task.style.display = '';
      found = true;
    } else {
      task.style.display = 'none';
    }
  });

  const notFoundMessage = document.getElementById('notFoundMessage');
  if (!found) {
    notFoundMessage.style.display = 'block';
  } else {
    notFoundMessage.style.display = 'none';
  }
}