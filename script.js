// all variables and html id's and class names are same so yo can easly find...

/*
METHOD              LINE NUMBER
POST                  51
GET                   97
PUT
PATCH
DELETE



*/


let base_url = `https://682f766ef504aa3c70f421f6.mockapi.io/Task-Manager-App`

// add new task button

const tasksDiv = document.querySelector('.tasks');
const addNewTask = document.getElementById('addNewTask');
const myTask = document.getElementById('myTask');
const importanTask = document.getElementById('importanTask');
const addTaskForm = document.getElementById('addTaskForm');
const addTaskBtn = document.getElementById('addTask');
const discardBtn = document.getElementById('discard');

const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('date');
const time = document.getElementById('time');
const important = document.getElementById('important');


//  allow the user to select only future dates 

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Set it as the minimum date
date.setAttribute("min", today);



// new task add form popup show
addNewTask.addEventListener('click', () => {
  addTaskForm.style.display = "block"
  tasksDiv.style.display = "none"
});

// new task add form hide and refresh page
discardBtn.addEventListener('click', () => {
  addTaskForm.style.display = "none"
  window.location.reload()
})

// add new task and data sent in databse  (POST method)

addTaskBtn.addEventListener('click', async () => {


  let check = title.value && description.value && date.value && time.value || important.checked



  if (!check) {
    alert("oopsss.... some thing missing....")
    return
  }

  let taksObj = {
    title: title.value,
    description: description.value,
    date: date.value,
    time: time.value,
    important: important.checked
  };

  let dataFetch = await fetch(base_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taksObj)
  });

  let response = dataFetch.json();

  if (!response.ok) {
    alert("Task Add successfully...")

    title.value = ""
    description.value = ""
    date.value = ""
    time.value = ""
    important.checked = ""
  } else {
    alert("oopsss... something went wrong")
  }
})

// display data function 

async function displayData() {

tasksDiv.innerHTML = ""
addTaskForm.style.display = "none"

  let dataFetch = await fetch(base_url);
  let response = await dataFetch.json();

  response.forEach((indTask) => {

    let div = document.createElement('div');
    div.className = "task"

    div.innerHTML = `
      <h3><span>Task :</span> ${indTask.id}</h3>
      <h1><span>Title :</span> ${indTask.title}</h1>
      <p><span>Description :</span> ${indTask.description}</p>
      <p><span>Date :</span> ${indTask.date}</p>
      <p><span>Time :</span> ${indTask.time}</p>

    `;

    if (indTask.important) {
      div.style.backgroundColor = "rgb(231, 77, 77)";
      div.style.border = "2px solid whitesmoke"
    };

    tasksDiv.appendChild(div)
  })
}

// important Task filter....

importanTask.addEventListener('click', async () => {

  tasksDiv.innerHTML = ""

  let dataFetch = await fetch(base_url);
  let response = await dataFetch.json();

  response.forEach((indTask) => {
    if (indTask.important) {
      let div = document.createElement('div');
      div.className = "task"

      div.innerHTML = `
      <h3><span>Task : ${indTask.id}</span><span id="impNote">Important</span></h3>
      <h1><span>Title :</span> ${indTask.title}</h1>
      <p id="description"><span>Description :</span> ${indTask.description}</p>
      <p><span>Date :</span> ${indTask.date}</p>
      <p><span>Time :</span> ${indTask.time}</p>

    `;
    tasksDiv.appendChild(div)
    }

  })

})

