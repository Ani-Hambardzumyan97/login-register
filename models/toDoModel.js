const mongoose=require("mongoose")

let Schema=mongoose.Schema

let toDoSchema=new Schema({
    item:{
        type:String
    }
},{
    timestamps:true
})

const ToDo=mongoose.model("todo",toDoSchema)

module.exports={
    ToDo
}