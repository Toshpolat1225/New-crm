const { Schema, model} = require('mongoose')

const salarySchema =new Schema({
    date: {
        type: String,
        required: true
    },
     dateOld: {
         type: String,
         required: true
     },
     
     price: {
         type: Number,
         required: true
     },
     name: {
         type: String,
         required: true
     },
     userid: {
        type: Schema.Types.ObjectId, 
     } 
      

})

module.exports = model('Salary',salarySchema)