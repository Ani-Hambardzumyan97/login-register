let todoForm=document.querySelector("#todoForm")
let todoInput=todoForm.elements["todo"]
let todoList=document.querySelector("#todoList")




todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()
   
    let todoObj={todo:todoInput.value}
    todoInput.value=""
    console.log("obj",todoObj)
    fetch("/todo",{
        method:"POST",
        headers:{
            "Content-Type":"application/JSON",
            "Accept":"application/JSON"
        },
        body:JSON.stringify(todoObj)
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
       let elem=document.createElement("li")
       elem.id=data.id
       elem.innerHTML=data.item
       todoList.append(elem)
        
    })
    
})


todoList.addEventListener("click",(e)=>{

    if(e.target.tagName=="LI"){
 
    fetch(`/todo/${e.target.id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/JSON",
            "Accept":"application/JSON"
        },
     }).then(res=>res.json())
    .then(data=>{
        e.target.remove()
        
    })
    }
})


todoList.addEventListener("contextmenu",(e)=>{
    e.preventDefault();

    if(e.target.tagName=="LI"){

        let oldinput = document.querySelector('#EditInput')

        if (oldinput!=null){

            document.getElementById(oldinput.className).innerHTML=oldinput.value
            oldinput.remove()
            // document.querySelector('#edit_ok').remove()
        }

        let text =e.target.innerHTML
        let text_id=e.target.id
        e.target.innerHTML=''

        let elem=document.createElement("input")
        elem.className=text_id
        elem.id='EditInput'
        elem.name='EditInput'
        elem.value=text
        elem.type='text'
        e.target.append(elem)
        let edit=document.createElement("button")
        edit.id='edit_ok'
        edit.innerHTML='edit'
        edit.setAttribute('onclick','editTodo()')
        e.target.append(edit)

    }
})
function editTodo(){
    let EditInput=document.querySelector("#EditInput").value
    let id=document.querySelector("#EditInput").className
    let todoeditObj={todoval:EditInput,id:id}
    fetch("/todo/edit",{
        method:"POST",
        headers:{
            "Content-Type":"application/JSON",
            "Accept":"application/JSON"
        },
        body:JSON.stringify(todoeditObj)
    }).then(res=>res.json())
        .then(data=>{
            document.getElementById(data.result._id).innerHTML=data.result.item

        })
}
