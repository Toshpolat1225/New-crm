const {
    Schema,
    model
} = require('mongoose')

const lidSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    count: Number
})

module.exports = model('lids', lidSchema)