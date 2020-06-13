const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(process.env.PORT || 3000, function(){

  "Server is running on Port 3000!"
});

app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");
});


app.post("/failure", function(req, res){

  res.redirect("/");
})

app.post("/", function(req, res){
const firstName = req.body.firstName;
const lastName = req.body.lastName;
const email = req.body.email;
  console.log(firstName, lastName, email);

var data= {
  members: [
{
email_address : email,
status : "subscribed",
merge_fields : {
  FNAME : firstName,
  LNAME : lastName
}
}
  ]
};

var jsonData = JSON.stringify(data); //b7fa57a04f5d551a6d4b3af5c741369b-us10 ,,,,b517583bd9
const url ="https://us10.api.mailchimp.com/3.0/lists/b517583bd9";
const options = {
method: "POST",
auth: "dafe:b7fa57a04f5d551a6d4b3af5c741369b-us10"
}
const request= https.request(url, options, function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}else{
 res.sendFile(__dirname + "/failure.html");
}


 response.on("data", function(data){
   console.log(JSON.parse(data));
 })
})
request.write(jsonData);
request.end();

});
