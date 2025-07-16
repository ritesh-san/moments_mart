const express=require('express');
const router=require('./routes/router');
app=express();
const port=4000;
app.get("/",(req,res)=>{
    res.send("<h3>welcome to my express server</h3>");
}) 
app.use("/customer",router);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
} ); 