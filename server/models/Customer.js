
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    email:{
        type:String,
        validate: {
            validator: async function(value) {
                // Vérification de l'unicité de la valeur
                const count = await mongoose.models.Customer.countDocuments({ email: value });
                return count === 0;
            },
            message: 'ID client already exists'
        },
        required:true
    
    },

    details:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    mdp:{
        type:String,
        required:true,
        unique: true
    },
    admin:{
        type:String,
        default:"simple"  
    },
    createdAt: {
        type: Date,
        default: Date.now()

    },
    updatedAt:{
        type:Date,
        default: Date.now()

    },
   
})





/**
   <div class="col">
    <label for="id">
         identifiant
    </label>
    <input type="text" class="form-control" id="_id" name="idClient" value="" placeholder="identifiant" required>

</div>
 */


//CustomerSchema.index({idClient: 1}, {unique: true});
//Schema.index({_id:1},{unique: true})
module.exports = mongoose.model('Customer', CustomerSchema)


