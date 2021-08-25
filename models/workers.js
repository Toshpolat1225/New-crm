const {Schema, model}  = require('mongoose')

const workerSchema = new Schema({
    email:{
    type: String,
    required: true
    },
    password:{
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    job:{
       type:String,
       required: true 
    },
    about:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    skills:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'default.png'
    },
    telegram:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'Worker'
    }

})

module.exports = model('worker',workerSchema)
