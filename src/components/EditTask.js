import {React,useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import { TextField } from '@mui/material';

function EditTask(props) {
    console.log("in the Edit Task Component")

    //Handlers
    const handleClose = () =>{
        props.setOpen(false)

    }
    /*
    filter() creates a new array filled with elements that pass a test provided by a function
    *does not execute the function for empty elements.
    *does not change the original array
    */


    const submitChangeHandler = () => {
        console.log(props.editTask.Subject)
        console.log(props.editTask.tags)
        //close the dialog box

        //map through the list and update subject and tags for the task to be edited
        props.taskList.map( (each_task) => {

            if(each_task.id === props.editTask.id){
                each_task.Subject = props.editTask.Subject
                each_task.tags = props.editTask.tags
            }
        })

        //now set the state to the modified state so that re-redering can happen
        props.setTaskList(props.taskList)
        
        //now close the dialog box
        props.setOpen(false)

       
    }

    const inputSubjectHandler = (event) => {
        let new_subject = event.target.value
        //console.log(new_subject)
        props.editTask.Subject = new_subject
        props.setEditTask(props.editTask)
    }

    const inputTagsHandler = (event) => {
        let new_tags = event.target.value
        //console.log(new_tags)
        let tagsArray = new_tags.split(",")
        //console.log(tagsArray)
        //now update the state variable we have for tags
        props.editTask.tags = tagsArray
        props.setEditTask(props.editTask)
    }


    console.log("Open now is ")
    console.log(props.open)
    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}
            >
                <DialogTitle> Edit Task </DialogTitle>
                
                <DialogContent>
                
                    <DialogContentText>
                        Edit the Task's Subject and Tags here 
                    </DialogContentText>
                    <p></p>
                    <TextField
                    onChange = {inputSubjectHandler} 
                    fullWidth 
                    id="outlined-basic" label="Edit Task" 
                    variant="outlined" color="success" focused 
                    defaultValue={props.editTask.Subject} //default value of the text field
                    style={{width: '500px',
                        color: "black",
                        marginLeft: '4px',
                        marginRight: '20px',
                        marginTop: '20px',
                        marginBottom: '10px'
                    }} 
                    />
                    <p></p>
                    <TextField
                    onChange = {inputTagsHandler} 
                    id="outlined-basic" label="TAGS" 
                    variant="outlined" color="secondary" focused 
                    defaultValue={props.editTask.tags} //default value of the text field 
                    style={{width: '500px',
                    color: "black",
                    marginLeft: '4px',
                    marginRight: '20px',
                    marginTop: '20px',
                    marginBottom: '10px'
                    }} 
                    />
                    <p></p>
                    <Button style={{marginLeft: '200px', marginTop:'10px'}} variant="contained" size="small" onClick={submitChangeHandler}>Submit</Button>

                </DialogContent>

            </Dialog>


           
        </div>
    )
}

export default EditTask
