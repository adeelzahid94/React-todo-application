import React,{useState} from "react";
import { TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
//above import requires npm install @mui/icons-material
import { IconButton } from "@mui/material";
import CreatedTask from "./CreatedTask";
import { ClassNames } from "@emotion/react";


const TaskForm = (props) => {
    console.log("In the task Form")
    
    //Functions and Handlers

    //Triggered with onChange event of the form
    const inputTextHandler = (event) =>{
        //console.log("Something Changed")
        props.setInput(event.target.value)//pick value from the event which is 
        //the text entered by the user and set state with it
        //console.log(props.input)    
    }

    //handler triggered when user clicks the submit button
    //capture user input using relevant state variable and put in the tasks list
    const submitTaskHandler = () => {
        console.log("in the add task button handler")
        //event.preventdefault()
        props.setTaskList( //setTaskList expects an array of tasks objects
            //each task is an object having four things
            // 1) Subject
            // 2) Completed - either true or false
            // 3) id - unique id of the task object
            // 4) tags - an array of tags associated with the task  

            //lets create the array by first putting old tasks in the 
            //array by ...props.taskList and adding new task as an object
            //for the first time, only new task will be added

            [...props.taskList, { Subject: props.input, completed: false,
                id: Math.random()*1000, tags: [...props.tags] }
            ]
        
        )

        //Note that REACT is very smart. In createdTask we give unique ID to each listItem,
        //Because of uniqueness of ID's, react only renders unique ID on the screen and does not repeat the entire
        //array of tasks
    }

    const captureTagsHandler = (event) => {
        console.log("In the capture tags handler")
        let tagsInput = event.target.value //comma separated input of tags put 
        //inside the tags input field
        //console.log(tagsInput)
        let tagsArray = tagsInput.split(",")
        console.log(tagsArray)

        //you can write a function to remove spaces from the words

        //now update the state variable we have for tags
        props.setTags( [...tagsArray] )
        console.log(props.tags) 
    }


    return(
        <div>
            <TextField
                onChange = {inputTextHandler} 
                id="outlined-basic" label="Add Task" 
                variant="outlined" color="secondary" focused
                InputProps={{
                    style: {
                        width: 1000,
                        color: "black",
                        marginLeft: '4px',
                        marginRight: '10px'

                    }
                }}
            />

            <TextField
                onChange = {captureTagsHandler} 
                id="filled-basic" label="Add Tags" 
                variant="filled" multiline 
                size = "Normal"
                margin = "Dense"
                style = 
                {{
                width: 600,
                marginTop: '20px',
                marginLeft: '10px'
                
                }} //assign the width as your requirement

            />
            
            <IconButton onClick={submitTaskHandler}
            style = 
            {{
            marginTop: '25px',
            marginLeft: '10px'
            }}
            >
                <AddBoxOutlinedIcon />
            </IconButton>
        </div>

    )

}

export default TaskForm