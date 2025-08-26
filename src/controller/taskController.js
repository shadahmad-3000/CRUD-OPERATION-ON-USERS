const service = require('../service/taskService');

const serviceStatus = async(req, res)=>{
    const response = await service.serviceStatus();
    res.status(response.status).send(response.message);
}

const createTask = async(req, res) => {
    const response = await service.createTask(req.body);
    res.status(response.status).json(response);
}

const getTask = async(req, res) => {
    const response = await service.getTask(req.params.id);
    res.status(response.status).json(response);
}

const updateTask = async(req, res) => {
    const response = await service.updateTask(req.params.id, req.body);
    res.status(response.status).json(response);
}

const deleteTask = async(req, res) =>{
    const response = await service.deleteTask(req.params.id);
    res.status(response.status).json(response);
}

module.exports = {
    serviceStatus,
    createTask,
    getTask,
    updateTask,
    deleteTask
};