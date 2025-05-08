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


    


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
