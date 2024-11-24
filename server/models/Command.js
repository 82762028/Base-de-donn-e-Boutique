

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  CommandSchema = new Schema({
    name:{
        type:String,
    }, 
    prenom:{
        type:String,
   
    }, 
    idClient:{
        type:String,
   
    },
    category:{
        type:String,
  
    },
    email:{
        type:String,
  
    },
    product: [
        {
            name:{
                type:String,
       
            },
            prix: {
            type:Number,
     
            },
    
        stock: {
            type:Number,
    
            },
        category: {
            type:String,
    
        },
        qte:{
            type:Number,
    
            },
        idProduct:{
            type:String,
    
            },
            // Ajoutez d'autres propriétés spécifiques aux produits si nécessaire
        }
     ],
    createdAt: {
        type: Date,
        default: Date.now()

    },
 
})
module.exports = mongoose.model('Command', CommandSchema)
