const { Schema, model } = require("mongoose");

const trainees = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Object,
    required: true,
  },
  leader: {
    type: String,
    required: true,
  },
  works: [
    {
      worker: {
        type: Schema.Types.ObjectId,
        ref: "worker",
      },
    },
  ],
  telegram: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  progress: Number,
});

module.exports = model("traineesproject", trainees);
