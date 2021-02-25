
const chechkSign=(req,res,next)=>{
   if(req.session.user){
      next();     //If session exists, proceed to page
    } else {
      var err = new Error("Not logged in!");
      res.redirect('/auth/login');
      next(err);  //Error, trying to access unauthorized page!
    }
}
module.exports={
    chechkSign
}