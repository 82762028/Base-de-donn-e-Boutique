const mongoose = require('mongoose');

mongoose.set('strictQuery',false);
//connection a la base de donnée
const connectDB = async()=>{
    try{
const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected ${conn.connection.host}`);
    }catch(error){
   console.log(error);
    }
}


module.exports = connectDB;