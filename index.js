// var state = {
//   taskList: [
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//   ],
// };

// backup storage
const state = {
    taskList: [],
};

// DOM Operations
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal);

// Template for the card on screen
const htmlTaskContent = ({ id, title, description, type, url }) => `
  <div class ='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
      <div class='card-header d-flex justify-content-end task__card__header '>
        <button type='button' class='btn btn-outline-info mr-1.5' name=${id}>
            <i class='fas fa-pencil-alt' name=${id}></i>
        </button>
        <button type='button' class='btn btn-outline-danger mr-1.5' name=${id} onclick= 'deleteTask.apply(this, arguments)'>
            <i class='fas fa-trash-alt' name=${id}></i>
        </button>
      </div>
      <div class='card-body'>
          ${
            // url &&
            // `<img width='100%' src=${url} alt= 'Card Image' class='card-img-top md-3 rounded-lg' />`
            url
              ? `<img width='100%' src=${url} alt= 'Card Image' class='card-img-top md-3 rounded-lg' />`
              : `<img width='100%' src= "https://cdn.pixabay.com/photo/2017/12/29/12/09/note-3047435_1280.jpg" alt= 'Card Image' class='card-img-top md-3 rounded-lg' />`
          }
          <h4 class='card-title task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
             <span class='badge bg-primary m-1'>${type}</span>
          </div>
      </div>
      <div class='card-footer'>
        <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask()' id=${id}>Open Task</button>
      </div>
    </div>
  </div>
`;



// Modal Body on >> Clk of Open Task
const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
         ${
           //  url &&
           //  `<img width='100%' src=${url} alt= 'Card Image' class='img-fluid place__holder__image mb-3' />`
           url
             ? `<img width='100%' src=${url} alt= 'Card Image' class='card-img-top md-3 rounded-lg' />`
             : `<img width='100%' src= "https://cdn.pixabay.com/photo/2017/12/29/12/09/note-3047435_1280.jpg" alt= 'Card Image' class='card-img-top md-3 rounded-lg' />`
         }
         <strong class='text-muted text-sm'>Created On: ${date.toDateString()}</strong>
         <h2 class='my-3'>${title}</h2>
         <p class='text-muted'>${description}</p>

    </div>
    `;
};

// Where we convert json to String (i.e., for local storage)
const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};

// Where we convert String to json (i.e., for rendering the cards on the screen)
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if(localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};


// Spread Operator
/**
 const obj = {
  name: "sidney",
  age: 2
 }


 console.log(obj);
  {name: 'sidney', age: 2}
 
 console.log({obj});
  {obj: {...}}obj: {name: 'sidney', age: 2}[[Prototype]]: Object
 
 console.log({...obj});
  {name: 'sidney', age: 2}

  // appending of adding a new key into obj:
  console.log({...obj, designation: "mentor"});
  {name: 'sidney', age: 2, designation: 'mentor'}
*/



// when we update or when we edit, we need to save
const handleSubmit = (event) => {
  const id = `${Date.now()}`; // which card specifically got updated. The id tells us that
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
  if(input.title==="" || input.type==="" || input.description===""){
    return alert("Please fill all the necessary fields");
  }
taskContents.insertAdjacentHTML(
  "beforeend", 
  htmlTaskContent({...input, id })
  );
  state.taskList.push({...input, id});

  updateLocalStorage();
};

//open task
const openTask = (e) => {
  if(!e) e = window.event;

  const getTask = state.taskList.find(({id}) => id === e.target.id); 
  taskModal.innerHTML = htmlModalContent(getTask);
};

//delete task - This commented-out function deletes the task and then after I reload the page, the deleted task comes back again.
// const deleteTask = (e) => {
//   if (!e) e = window.event;

//   const targetId = e.target.getAttribute("name");
//   // console.log(targetId);
//   const type = e.target.tagName;
//   // console.log(type);
//   const removeTask = state.taskList.filter(({id}) => id !== targetId);
//   // console.log(removeTask)
//   updateLocalStorage();

//   if(type === "BUTTON") {
//     // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
//     return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
//       e.target.parentNode.parentNode.parentNode
//     );
//   } else if (type === "I") {
//   return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
//       e.target.parentNode.parentNode.parentNode.parentNode
//     );
//   }
// };
const deleteTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.getAttribute("name");

  // Remove the task from state.taskList
  state.taskList = state.taskList.filter(({ id }) => id !== targetId);

  // Update local storage
  updateLocalStorage();

  // Remove the HTML element corresponding to the deleted task from the DOM
  const taskElement = document.getElementById(targetId);
  if (taskElement) {
    taskElement.remove();
  }
};

//edit task


//save edit

//search
