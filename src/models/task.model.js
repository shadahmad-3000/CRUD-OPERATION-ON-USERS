const mongoose = require('mongoose');
const moment = require('moment');

const TaskSchema = new mongoose.Schema({
    assignee:{type:String, required:true},
    assignedBy:{type: String, required:true},
    duration: { 
    type: String, 
    validate: {
      validator: function(v) {
        return /^(\d+w)?(\d+d)?(\d+h)?(\d+m)?$/.test(v); 
        // Examples allowed: "1w", "2d", "3h", "45m", "1d4h", "2w3d", etc.
      },
      message: props => `${props.value} is not a valid duration format`
    }
  },
    priority:{type: String, enum:["Low", "Medium", "High"], default: "Medium"},
    status:{type:String, enum:["To Do", "In Progress", "Ready for QA", "Verified", "Done"], default:"To Do"},
   start: {
    type: Date,
    get: v => moment(v).format("YYYY-MM-DD"),
    set: v => moment(v, "YYYY-MM-DD").toDate()
  },
  end: {
    type: Date,
    get: v => moment(v).format("YYYY-MM-DD"),
    set: v => moment(v, "YYYY-MM-DD").toDate()
  }
}, {timestamps: true});

module.exports = mongoose.model("Task", TaskSchema);