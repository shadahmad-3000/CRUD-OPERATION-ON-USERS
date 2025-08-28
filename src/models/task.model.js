const mongoose = require('mongoose');
const moment = require('moment');

const TaskSchema = new mongoose.Schema({
    assignee:{type:String, required:true},
    assigneeEmail: { 
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"] 
    },
    assignedBy:{type: String, required:true},
    duration: { 
    type: String, 
    validate: {
      validator: function(v) {
        const regex = /^(\d+w)?(\d+d)?(\d+h)?(\d+m)?$/; 
        // Examples allowed: "1w", "2d", "3h", "45m", "1d4h", "2w3d", etc.

        if (!regex.test(v)) return false;

        if (this.start && this.end){
          const diffHours = moment(this.end).diff(moment(this.start), 'hours');

          let match = v.match(/(\d+)w|(\d+)d|(\d+)h|(\d+)m/g);
          let totalHours = 0;
          if (match) {
            match.forEach(part => {
              if (part.endsWith('w')) totalHours += parseInt(part) * 7 * 24;
              else if (part.endsWith('d')) totalHours += parseInt(part) * 24;
              else if (part.endsWith('h')) totalHours += parseInt(part);
              else if (part.endsWith('m')) totalHours += parseInt(part) / 60;
            });
          }
          return Math.round(totalHours) === diffHours;
        }
        return true;
      },
      message: props => `${props.value} does not match the time difference between start date and end date`
    }
  },
    priority:{type: String, enum:["Low", "Medium", "High"], default: "Medium"},
    status:{type:String, enum:["To Do", "In Progress", "Ready for QA", "Verified", "Done"], default:"To Do"},
   start: {
    type: Date,
    get: v => moment(v).format("YYYY-MM-DD HH:mm"),
    set: v => moment(v, "YYYY-MM-DD HH:mm").toDate()
  },
  end: {
    type: Date,
    get: v => moment(v).format("YYYY-MM-DD HH:mm"),
    set: v => moment(v, "YYYY-MM-DD HH:mm").toDate()
  },
  halfTimeNotified : {type: Boolean, default:false},
  deadlineMissedNotified : {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model("Task", TaskSchema);