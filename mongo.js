const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://Marvian:Character31+@cluster0.lfu7p09.mongodb.net/')
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   
})


const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection