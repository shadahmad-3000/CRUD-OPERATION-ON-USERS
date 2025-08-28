const service = require('../service/taskEmailerService');

const checkDeadlines = async(req, res) => {
    const response = await service.checkDeadlines(req.params.id);
    res.status(response.status).json(response);
}

const sendReminderForTask = async(req, res) => {
    const response = await service.sendReminderForTask(req.params.id);
    res.status(response.status).json(response);
}

module.exports = {
    checkDeadlines,
    sendReminderForTask
}