

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    prix:{
        type:Number,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    stock:{
        type:Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()

    },
    updatedAt:{
        type:Date,
        default: Date.now()

    }
})
module.exports = mongoose.model('Product', ProductSchema)