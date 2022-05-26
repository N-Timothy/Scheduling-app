import './style.css'

let update = false;
let idNumber = 0;
let updatedTaskId = "";
let index = '0';

let allTask = document.getElementById('allTask');

function init() {
  if(localStorage.getItem(0) === null){
    index = '1';
    localStorage.setItem(0, index);
  } else {
    index = localStorage.getItem(0);
  }
}

function incrementIndex() {
  index = parseInt(index);
  index += 1;
  index = index.toString();
  localStorage.setItem(0, index);
}

function getSchedule () {

    document.getElementById('create').addEventListener('click', () => {
      update = false;
      document.getElementById('taskType').innerHTML = "CREATE NEW TASK"
      document.getElementById('task').value =  "";
      document.getElementById('time').value =  "";
    })

    document.getElementById('schedule').addEventListener('submit', () => {
      let task = document.getElementById('task').value;
      let time = document.getElementById('time').value;
      let x = {
        item : {
          task,
          time
        }
      }
      if(!update){
      document.getElementById('task').value =  "";
      document.getElementById('time').value =  "";
      saveData(index , x);
      incrementIndex();
      
      for(const i in localStorage){
        if (i !== '0' && localStorage.getItem(i)!== null && i !== (parseInt(index) - 1).toString()){
          document.getElementById(`p${i}`).remove();
          document.getElementById(`${i}`).remove();
          document.getElementById(`u${i}`).remove();
        }
      }

      printTask();
      deleteTask();
      updateSchedule();
    }  else { 
      saveData(idNumber, x);
      printUpdate(idNumber);
      deleteTask();
      updateSchedule();
    }
  })   
}

function printUpdate(i) {
  let schedules = JSON.parse(getData(i));
  document.getElementById(`p${i}`).innerHTML = "TASK :   " + schedules.item.task + 
  "  TIME :   "  + schedules.item.time;
}


function printTask() { 
  for (const i in localStorage){
    if (localStorage.getItem(i) !== null && i !== '0') {
    let fullItem = document.createElement('p');
    let deleteButton = document.createElement('button');
    let updateButton = document.createElement('button');
    updateButton.id = `u${i}`; 
    updateButton.innerHTML = "UPDATE";
    updateButton.classList.add("updateButton");
    deleteButton.id = i;
    deleteButton.innerHTML = "DELETE";
    deleteButton.classList.add('deleteButton');
    fullItem.id = `p${i}`;
    let schedules = JSON.parse(getData(i));
    fullItem.innerHTML =  "TASK :   " + schedules.item.task + 
    "  TIME :   "  + schedules.item.time;
   allTask.appendChild(fullItem);
   allTask.appendChild(deleteButton);
   allTask.appendChild(updateButton);
    }
  }
}

function deleteTask() {
  for(const i in localStorage){
    if (localStorage.getItem(i) !== null && i !== '0' ) {
    document.getElementById(`${i}`).addEventListener('click', () => { 
      openModal(i);
      // document.getElementById(`p${i}`).remove();
      // document.getElementById(`${i}`).remove();
      // document.getElementById(`u${i}`).remove();
      // removeData(i);
      // printTask();
    })
    }
  }
}

function openModal (i) {

  var modal = document.getElementById("myModal");

  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  modal.style.display = "block";
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  document.getElementById('yes').addEventListener('click', () => {
      document.getElementById(`p${i}`).remove();
      document.getElementById(`${i}`).remove();
      document.getElementById(`u${i}`).remove();
      removeData(i);
      modal.style.display = 'none';
  })

  document.getElementById('no').addEventListener('click', () => {
    modal.style.display = 'none';
  })
}


function updateSchedule () {
  for(const i in localStorage) {
    if (localStorage.getItem(i) !== null && i !== '0') {
    document.getElementById(`u${i}`).addEventListener('click', () => {
      update = true;
      document.getElementById('taskType').innerHTML = "UPDATE TASK"
      updatedTaskId = `p${i}`
      let schedules = JSON.parse(getData(i));
      document.getElementById('task').value =  schedules.item.task;
      document.getElementById('time').value =  schedules.item.time;
      idNumber = i;
    })
  }
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
  return localStorage.getItem(key)
}

function removeData(key) {
  localStorage.removeItem(key);
}

init();
getSchedule();
printTask();
deleteTask();
updateSchedule();
