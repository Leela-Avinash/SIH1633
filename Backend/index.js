const express=require("express");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/bmicalculator",function(req,res){
    res.sendFile(__dirname+"/calculator.html");
})

app.post("/",function(req,res){
    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2)  ;
    var result=num1+num2;
    res.send("Result of the calculation is "+result);
})

app.post("/bmicalculator",function(req,res){
    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2);
    var result=num1/(num2*num2);
    res.send("The BMI is "+result);
})
app.listen(3000,function(){
    console.log("Server started at 3000");
})