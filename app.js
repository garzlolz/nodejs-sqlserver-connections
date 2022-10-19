var express=require('express');
var app=express();
app.get('/',function(req,res){
 var sql=require('mssql');
 
//config for your database
 var config={
    user:'sa',
    password:'1213',
    server:'localhost\\SQLEXPRESS',   //這邊要注意一下!!
    database:'FCGoDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
      }
 };
 
//connect to your database
 sql.connect(config,function (err) {
   if(err) console.log(err);
 
//create Request object
   var request=new sql.Request();
request.query("select TOP (10) * from Customer  ",function(err,recordset){
   if(err) console.log(err);
 
//send records as a response
recordset.recordset.forEach((row,index) => {
    row.index = index
})
   res.send(recordset.recordset);
   });
 });
 
});
 
var server=app.listen(5050,function(){
 console.log('Server is running!');
});