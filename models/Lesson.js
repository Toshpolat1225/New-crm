const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  libraryId: {
    ref: "library",
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = model("lesson", productSchema);
