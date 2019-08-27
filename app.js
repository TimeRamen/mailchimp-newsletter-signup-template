
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));



app.get("/", function(req,res){
	res.sendFile(__dirname + "/signup.html");
})

app.post("/failure",function(req,res){
	res.redirect("/")
})

app.post("/",function(req,res){
	var firstName = req.body.name;
	var lastName = req.body.sname;
	var email = req.body.email;
	
	
	var data = {
		members: [
			{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				"FNAME":firstName,
				"LNAME":lastName
			}
			}
		]
	};
	
	var jsonData = JSON.stringify(data);
	
	var options = {
		url: "https://us3.api.mailchimp.com/3.0/lists/" //+ your audience id,
		method: "POST",
		headers:{
			"Authorization": "taimur " //+ your api key//
		},
		body: jsonData
		
	}
	//console.log(firstName, lastName, email);
	request(options, function(error,response,body){
		if(error){
			console.log(error);
			res.sendFile(__dirname + "/failure.html");
		}else{
			console.log(response.statusCode); 
			if(response.statusCode === 200){
				res.sendFile(__dirname + "/success.html");
			}else{
				res.sendFile(__dirname + "/failure.html");
			}
			
		}
	})

})

app.listen(3000, function(){
	console.log("Server running at port 3000");
})