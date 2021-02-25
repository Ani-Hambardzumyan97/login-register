const { ToDo } = require("../models/toDoModel")


class ToDoControoler {
   async addnewToDo(req,res){
       let todo=req.body.todo
       let result=await ToDo.create({item:todo})
      
       res.json({id:result._id,item:result.item})
    }
    async getToDos(req,res){

       let todos=await ToDo.find()
       res.render("todo",{todos:todos})
        
    }
    async deleteToDo(req,res){
        let id=req.params.id
     
        let result= await ToDo.deleteOne({_id:id})
       
        res.json({count:result.n})
        
    }
    async editToDo(req,res){
        ToDo.findOne(
            {_id:req.body.id},(err,post)=>{
                if(err){
                    console.log(err);
                }else{
                    post.item=req.body.todoval;

                    post.save((err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            res.json({result});
                        }
                    })
                }
            }
        );


    }
}

module.exports=new ToDoControoler()