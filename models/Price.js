const {
  Schema,
  model
} = require("mongoose");

const priceShcema = new Schema({
  name: {
    type: String,
    required: true
  },
  allInfo:[
    {
      text: String
    }
  ], 
  price: {
    type: Number,
    required: true
  }
})



module.exports = model("proPrice", priceShcema);