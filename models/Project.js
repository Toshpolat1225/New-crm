const { Schema, model } = require("mongoose");

const project = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
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
      payment: Object,
    },
  ],
  totalPayment: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientNumber: {
    type: Number,
    required: true,
  },
  telegram: {
    type: String,
    required: true,
  },
  clientLocation: {
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

module.exports = model("project", project);
