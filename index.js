const path = require('path');
const http = require('http');
const express=require('express');
const uuid=require('uuid');
const app=express()
app.use(express.json())
const Employees=require('./employees');
const employees = require('./employees');
//PORT
const PORT=3100;


app.get('/',(req,res)=>{
    res.send("Geting the Data")
})
//GET ALL EMPLOYEES
app.get("/Employees",(req,res)=>{
    res.send(Employees)
})
//Get Single Employee
app.get("/Employees/:id",(req,res)=>{
    const employee=Employees.find((e)=>e.id===parseInt(req.params.id))
    if(employee){
        res.send(employee)
    }else{
        res.status(404).send("Employee not found")
    }
})
//Get by Name using the Post Method
app.post("/Employees/:name",(req,res)=>{
    const employee=Employees.find((e)=>e.name===req.params.name)
    if(employee){
        res.send(employee)
    }else{
        res.status(404).send("Employee not found")
    }
})
//Adding newemployees
app.post("/newemployees",(req,res)=>{
    // console.log("req.body",req.body);
// {**************************************************}
    // const name=req.body.name
    // const email=req.body.email
    // console.log(name,email);
// {**************************************************}
    // const {name,email}=req.body
    // console.log(name,email);
 // {**************************************************}
    // const {name,email}={...req.body}
    // console.log(name,email);
// {**************************************************}
    
const {name,email,age}=req.body
const employee={
    id:uuid.v4(),
    name,
    email,
    age
}
Employees.push(employee)
res.send(employee)
})

//Another secondEmployee
app.post("/secondEmployee",(req,res)=>{
    const {name,email,age}=req.body
    const employee={
        id:uuid.v4(),
        name:name,
        email:email,
        age:age
    }
    Employees.push(employee)
    res.send(employee)
})
//Delete Employees
app.delete("/delete/:uid",(req,res)=>{
    const id=parseInt(req.params.uid)
    // console.log(id);
    const found =employees.some(employee=>employee.id===id)//some method: true or false
    // console.log(found);
  if(found){
    res.send(employees.filter(employee=>employee.id!==id))
  }
  else{
    res.status(404).send("Employee not found")
  }
  
})

app.put("/update/:uid",(req,res)=>{
    const id=parseInt(req.params.uid)
    const found =employees.some(employee=>employee.id===id)
    if(found){//found method: true or false
        const updateEmployee=req.body
        employees.forEach(employee=>{
            if(employee.id===id){
                employee.name=updateEmployee.name?updateEmployee.name:employee.name
                employee.email=updateEmployee.email?updateEmployee.email:employee.email
                employee.age=updateEmployee.age?updateEmployee.age:employee.age
            }
        })
        res.send(employees.filter(employee=>employee.id===id))
        
    }
    else{
        res.status(404).send("Employee not found")
    }
})


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

