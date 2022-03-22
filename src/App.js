import React, {useState , useEffect} from 'react';
import './App.css';
//import Button from '@mui/material/Button';
//import { TextField } from '@mui/material';
import TaskForm from './components/TaskForm';
import CreatedTask from './components/CreatedTask'
import EditTask from './components/EditTask';
import CompletedTasks from './components/CompletedTasks';

function App() {

  //States and Hooks - must be inside the App component
  const [input,setInput] = useState("") //input state variable will capture the text 
  //entered by the user in the form. We will set the state in the 
  //onChange event handler 

  const [taskList, setTaskList] = useState([]) //state here would be a 
  //list of all tasks entered by the user
  
  const[tags,setTags] = useState([]) //tags state variable would have 
  //comma separated tags

  //editTask state variable has that task which we want to edit
  const [editTask,setEditTask] = useState({})

  //state for the dialog box form
  const [open, setOpen] = useState(false)

  //state variable to contain completed tasks
  const [completedTasks, setCompletedTasks] = useState([])



  //useEffect will be called after every render, by default
  // (the first one, and every one after that)

// Prevent useEffect From Running Every Render
// If you want your effects to run less often, you can provide a second argument – an array of values. 
//Its called a dependancy array. The dependency array is the second optional argument in the useEffect function. 
//As the name implies, it is an array of dependency’s that, when changed from the previous render, will 
//run the function defined in the useeffect

useEffect ( () => {
  console.log("I am calling this Hook to get data FROM the local storage")
  getLocalTaskList()
},[]) //  // we are only running this useEffect on the first render of app that is when app starts because we passed an
// empty array as dependency array. We do this because we only want this to get data from local storage on first 
//app load 


  useEffect ( () => {
    console.log("I am calling this Hook to SAVE data from TO local storage")
    saveLocalTaskList()
  } , [taskList] ) //here taskList is the dependency array so whenever task list changes that is some new task
  //added in the tasklist, saveLocalTaskList runs and store data in the local storage


  //Save Stuff in Local Storage
  const saveLocalTaskList = () => {
    console.log("Saving Stuff to Local Storage")
    //console.log(JSON.stringify(taskList)) //Convert a JavaScript object into a string with JSON.stringify().
    localStorage.setItem("taskList",JSON.stringify(taskList))
  }

  //Get stuff from local storage
  const getLocalTaskList = () => {
    if (localStorage.getItem("taskList") === null ){
      localStorage.setItem("taskList",JSON.stringify([]))
    }
    else {
      console.log("In the else condition to load data from local storage")
      console.log(localStorage.getItem("taskList"))
      let local_task_list = JSON.parse(localStorage.getItem("taskList"))
      console.log("After parsing local storage")
      console.log(local_task_list)
      setTaskList(local_task_list)
    }
  }

  
  return (
    <div className="App">
      <h1>Adeel's Task Manager</h1>
      <TaskForm
        input = {input} //passing the input state as props to the component
        setInput = {setInput}
        taskList = {taskList}
        setTaskList = {setTaskList}
        tags = {tags}
        setTags = {setTags}
        completedTasks = {completedTasks}
        setCompletedTasks = {setCompletedTasks}
       />
      <p> </p>
      <h3> Tasks To Do: </h3>
      <CreatedTask
        taskList = {taskList}
        setTaskList = {setTaskList}
        editTask = {editTask}
        setEditTask = {setEditTask}
        open = {open}
        setOpen = {setOpen}
        completedTasks = {completedTasks}
        setCompletedTasks = {setCompletedTasks}
      />

      <EditTask
        editTask = {editTask}
        setEditTask = {setEditTask}
        open = {open}
        setOpen = {setOpen}
        taskList = {taskList}
        setTaskList = {setTaskList}
      />

      <CompletedTasks
        completedTasks = {completedTasks}
        setCompletedTasks = {setCompletedTasks}
        taskList = {taskList}
        setTaskList = {setTaskList}
        editTask = {editTask}
        setEditTask = {setEditTask}
        open = {open}
        setOpen = {setOpen}
      />
    </div>

 

    
   
  );
}

export default App;
