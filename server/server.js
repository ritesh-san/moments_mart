const express=require('express');
const cors=require('cors');
const router=require('./routes/router');
app=express();
const port=4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));  //public folder configure for file upload

app.get("/",(req,res)=>{
    res.send("<h3>welcome to my express server</h3>");
}) 
app.use("/mart",router);
// app.use("/product",router);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
} ); 