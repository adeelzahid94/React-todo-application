import React from "react";
import { TextField } from '@mui/material';
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { Checkbox } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditTask from "./EditTask";
import { color } from "@mui/system";


/* Parenthesis/round brackets() are used in an arrow function to return an object.
If you use round brackets, you do not need to write "return" explicitly, automatically 
whatever is inside round brackets is returned. On the other hand with curly brackets {},
return must be explicitly written out

() => ({ name: 'YourName' })  // This will return an object
That is equivalent to

() => {
   return { name : 'YourName' }
}
*/


const CreatedTask = (props) => {
    console.log("in the created task component")

    const handleCheckbox = (task_id,check_status) =>{
        console.log("Check Event is")
        console.log(check_status)
        console.log("Task ID is")
        console.log(task_id)
        //iterate over the tasklist and set the appropriate complete flag(s)
        for (let each_task of props.taskList){
            if (each_task.id === task_id && check_status === true){
                each_task.completed = true

                //remove this task from taskList state 
                //Telling filter to set the state with all tasks except the one that is completed
                props.setTaskList(
                    props.taskList.filter( (task)=>{
                        return task.id !== each_task.id
                    })
                )

                //add this task to the completed tasks state variable
                props.setCompletedTasks(
                    [...props.completedTasks, each_task]
                )
            }
        }

        console.log(props.taskList)
    }

    //set the edit task state
    const editTaskHandler = (edit_task) =>{
        console.log("In the edit task handler");
        //console.log(edit_task)
        props.setEditTask(edit_task)
        //when you set this dialog box state to true, this means a state change, automatically now react gets a signal
        //to re render so it goes to App.js where state was declared and starts re-rendering from there. Any changes
        //will be re-rendered
        props.setOpen(true) 

    }
    

    //now we will use map to go through each task in the taskList array and using material ListItem, render the
    //task subject and tags on the screen
    return(
        
        <div>
        <List>
            { props.taskList.map( (each_task) => ( //note the use of round brackets which means auto return of whatever is inside the arrow function
                //key with the ListItem helps reach identify the element. Read more at: https://meganslo.medium.com/why-is-reacts-key-prop-important-b6bd51124270
                <ListItem key={each_task.id}> 
                    <ListItemIcon> 
                        <Checkbox onChange={ 
                            (event) => {handleCheckbox(each_task.id,event.target.checked)} 
                            /*event.target.checked tells you if checkbox is true or false that is checked or not*/ }/> 
                    </ListItemIcon>
                
                    <ListItemText 
                    primary={each_task.Subject}
                    //for secondary text of listItem, pick each tag, add a comma after it and render that
                    secondary = {each_task.tags.map( (each_tag) => {
                        return each_tag + ", "} 
                    )}
                    style={{ color: "#5C4033" }}
                    />

                    <ListItemIcon>
                        <EditIcon color="primary" onClick={() =>{
                            //console.log("Edit task being passed is")
                            //console.log(each_task)
                            editTaskHandler(each_task)
                        } 
                        } 
                        style={{ color: "#008080",
                        marginRight: '150px'
                        }}
                        />            
                    </ListItemIcon>
                
                </ListItem>                   
            ))
            }

          
        </List>
        </div>
    );
}

export default CreatedTask

