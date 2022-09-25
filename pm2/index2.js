const express=require('express')

const app=express()

app.get('/index2',(req,res)=>{
    res.json({
        code:200,
        message:"这是index2",
    })
})

app.listen(8001,()=>{
    console.log('index2.js========>','http://localhost:8001/index2');
})