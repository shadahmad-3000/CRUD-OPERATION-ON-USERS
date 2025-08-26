const Task = require('../models/task.model');

const serviceStatus = async() =>{
    return {
        status:200,
        message: "Service is running successfully !"
    }
};

const createTask = async(data) => {
    try{
        const task = new Task(data);
        await task.save();
        console.log("Check Task: ", task);
        return{
            status:201,
            message: "QR task created successfully !",
            data: task
        }
    }
    catch (err){
        console.log("error creating task: ", err);
        return{
            status:500,
            message: err.message
        }
    }
}

const getTask = async(id) =>{
    try{
        const task = await Task.findById(id);
        console.log("check fetched task ", task)

        if (!task){
            return{
                status:404,
                message:"Task not found."
            };
        };
        return{
            status:200,
            message:" Task fetched by Id !",
            data: task
        } 
    }
    catch (err){
        console.log("Error fetching task: ", err)
        return{
            status:500,
            message: err.message
        }
    }
};

const updateTask = async(id, data) => {
    try{
        const task = await Task.findByIdAndUpdate(id, {$set: data}, {new:true});
        console.log("Check updated task ", task);

        if(!task){
            return{
                status: 404,
                message: "Task that needs to be updated is not found in the database."
            };
        };
        return{
            status:200,
            message: "Task updated successfully !",
            data: task
        }
    }
    catch (err) {
        console.log("Error updating task: ", err);
        return{
            status:500,
            message: err.message
        }
    }
}

const deleteTask = async(id) => {
    try{
        const task = await Task.findByIdAndDelete(id);
        console.log(" The task that needs to be deleted is: ", task);

        if(!task){
            return{
                status:404,
                message: "Task that needs to be deleted is not found in the database."
            };
        };

        return{
            status:200,
            message: "Task has been deleted successfully !"
        }
    }
    catch (err){
        console.log("Error deleteing task: ", err);
        return {
            status:500,
            message: err.message
        }
    }
}

module.exports = {
    serviceStatus,
    createTask,
    getTask,
    updateTask,
    deleteTask
};

