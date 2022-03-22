import React from 'react'
import { TextField } from '@mui/material';
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { Checkbox } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditTask from "./EditTask";
import "../App.css" //double dot means go a level back




function CompletedTasks(props) {
    console.log("HURRAY ! In the completed task component")

    //Handlers
    const editTaskHandler = (edit_task) => {
        console.log("In the edit task handler");
        //console.log(edit_task)
        props.setEditTask(edit_task)
        //when you set this dialog box state to true, this means a state change, automatically now react gets a signal
        //to re render so it goes to App.js where state was declared and starts re-rendering from there. Any changes
        //will be re-rendered
        props.setOpen(true) 
    }

    const handleCompletedCheckbox = (task_id,check_status) =>{
        props.completedTasks.map( (each_task) => {
            
            if (each_task.id === task_id && check_status === false){
                each_task.completed = false
                //remove this task from completedtask state 
                //Telling filter to set the state with all tasks except the one that is completed
                props.setCompletedTasks(
                    props.completedTasks.filter( (task)=>{
                        return task.id !== each_task.id
                    })
                )
            props.setTaskList(
                [...props.taskList, each_task] )
            }

        }   
        )
       
    }

    return (
        <div>
            <h3 style={{ }} >Completed Tasks: </h3>
            <List>
            { props.completedTasks.map( (comp_task) => (
                <ListItem key={comp_task.id}> 
                <ListItemIcon> 
                    <Checkbox defaultChecked={true} onChange={ 
                        (event) => {handleCompletedCheckbox(comp_task.id,event.target.checked)} 
                        /*event.target.checked tells you if checkbox is true or false that is checked or not*/ }
                        style={{ color: "#008080" }}
                        /> 
                </ListItemIcon>
            
                <ListItemText 
                primary={comp_task.Subject}
                
                //for secondary text of listItem, pick each tag, add a comma after it and render that
                secondary = {comp_task.tags.map( (each_tag) => {
                    return each_tag + ", "
                }
                )}
                style={{ color: "#5C4033" }}

                />

                <ListItemIcon>
                    <EditIcon color="primary" onClick={() =>{
                        //console.log("Edit task being passed is")
                        //console.log(each_task)
                        editTaskHandler(comp_task)
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
    )
}

export default CompletedTasks
