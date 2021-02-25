const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const { BIconReceipt } = require("bootstrap-vue")
const Salt_round=10

const Schema=mongoose.Schema

const UserSchema=new Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String
    }
},{
    timestamps:true
})

UserSchema.pre("save",preSave=(next)=>{
    const user=this

    if(!user.password.isModified()) return next()

    return bcrypt.getSalt(Salt_round,(err, hashSalt)=>{
         
        if(err) next(err)
          bcrypt.hash(user.password,hashSalt,(err, hash)=>{
            if(err) next(err)
            user.password=hash 
             next()

          } )

    })



})

UserSchema.methods.comparePassword=function comparePassword(reqPass,cb){
       bcrypt.compare(reqPass,this.password,(err, match)=>{
           if(err) return cb(err)
           return cb(null,match)
       })

}




const UserModel=mongoose.model("user",UserSchema)

module.exports={
    UserModel
}