const { UserModel } = require("../models/UserModel")

class AuthController{

    registerView(req,res){
        let message=""
        res.render("register",{message:message})
    }
    async  registerNewUser(req,res){
      try{  
        console.log("->",req.body)
        let email=req.body.email
        let user= await UserModel.findOne({email:email})
        if(user){
            return res.render("register",{message:`Email ${user.email} is taken`})
        }
        let newUser=new UserModel({
             username:req.body.username,
             email:req.body.email,
             password:req.body.password,

        })
        let result=await newUser.save()
        res.redirect("/auth/login")
       }catch(err){
           console.log(err)
        return res.render("register",{message:err.message})
       } 
    }

    loginView(req,res){
        let message=""
        res.render("login",{message:message})
    }

    async  loginUser(req,res){
        try{  
         
          let user= await UserModel.findOne({email:req.body.email})
          if(!user){
              return res.render("login",{message:`Email or password is incorrect`})
          }
          console.log(req.body.password)
console.log(user)
          let passwordOk=await user.comparePassword(req.body.password)
          
          if(!passwordOk){
            return res.render("login",{message:`Email or password is incorrect`})
          }
           req.session.user=user
           res.redirect("/todo")

         }catch(err){
             console.log(err)
          return res.render("register",{message:err.message})
         } 
      }
}

module.exports=new AuthController()