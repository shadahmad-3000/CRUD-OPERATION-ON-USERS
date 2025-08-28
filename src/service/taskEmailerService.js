const Task = require('../models/task.model');
const sendEmail = require('../service/emailService');
const moment = require('moment');

const checkDeadlines = async (id) => {
    try {
        let tasks = [];

        if (id) {
            const task = await Task.findById(id); 
            if (!task) {
                return {
                    status: 404,
                    message: "Task not found"
                };
            }
            tasks = [task];
        } else {
            tasks = await Task.find();
        }

        const now = moment();
        let notifications = [];

        for (let task of tasks) {
            const start = moment(task.start);
            const end = moment(task.end);

            if (!start.isValid() || !end.isValid()) continue;

            const totalDuration = end.diff(start, "minutes");
            const halfDuration = totalDuration / 2;
            const timePassed = now.diff(start, "minutes");

            if (end.isBefore(now) && !task.deadlineMissedNotified) {
                await sendEmail(
                    task.assigneeEmail, 
                    "DEADLINE MISSED!",
                    `Hello, the deadline for your task assigned by ${task.assignedBy} has already passed on ${end.format("YYYY-MM-DD HH:mm")}.`
                );

                task.deadlineMissedNotified = true;
                await task.save();

                notifications.push(`Deadline missed email sent to ${task.assignee}`);
                continue;
            }

            if (!task.halfTimeNotified && timePassed >= halfDuration && now.isBefore(end)) {
                await sendEmail(
                    task.assigneeEmail, 
                    "Task halfway reminder",
                    `Hello, your task assigned by ${task.assignedBy} is halfway done. Deadline: ${end.format("YYYY-MM-DD HH:mm")}`
                );

                task.halfTimeNotified = true;
                await task.save();

                notifications.push(`Halfway reminder sent to ${task.assignee}`);
            }
        }

        return {
            status: 200,
            message: "Deadline check completed",
            notifications
        };
    } catch (error) {
        console.error("Error checking deadlines:", error);
        return {
            status: 500,
            message: error.message
        };
    }
};

const sendReminderForTask = async (id) => {
    try {
        const task = await Task.findById(id);

        if (!task) {
            return {
                status: 404,
                message: "Task not found"
            };
        }

        await sendEmail(
            task.assigneeEmail, 
            "Manual Task Reminder",
            `Hello, this is a manual reminder for your task assigned by ${task.assignedBy}. Deadline: ${moment(task.end).format("YYYY-MM-DD HH:mm")}`
        );

        return {
            status: 200,
            message: `Manual reminder sent to ${task.assignee}`
        };

    } catch (error) {
        console.error("Error sending manual reminder:", error);
        return {
            status: 500,
            message: error.message
        };
    }
};

module.exports = {
    checkDeadlines,
    sendReminderForTask
};