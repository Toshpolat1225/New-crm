const { Schema, model } = require("mongoose");

const stajorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

module.exports = model("library", stajorSchema);
