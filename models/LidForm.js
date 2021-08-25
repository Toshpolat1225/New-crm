const {
    Schema,
    model
} = require('mongoose')

const lidFormSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        ref: 'lids',
        type: Schema.Types.ObjectId,
        required: true
    },
    num1: {
        type: String,
        required: true
    },
    num2: {
        type: String,
        required: true
    },
    found: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,

    },
    note: {
        type: String,

    },

})

module.exports = model('lidForm', lidFormSchema)