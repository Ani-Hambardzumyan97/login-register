const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const { BIconReceipt } = require("bootstrap-vue")
const SALT_WORK_FACTOR=10

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

UserSchema.pre('save', function preSave(next) {
    const user = this;
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
  
    // generate a salt
    return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);
      // hash the password using our new salt
      return bcrypt.hash(user.password, salt, (hasherr, hash) => {
        if (hasherr) return next(hasherr);
        // override the cleartext password with the hashed one
        user.password = hash;
        return next();
      });
    });
  });
  
  UserSchema.methods.comparePassword=async function comparePassword(reqPass){

    return await bcrypt.compare(reqPass, this.password)

}
  



const UserModel=mongoose.model("user",UserSchema)

module.exports={
    UserModel
}