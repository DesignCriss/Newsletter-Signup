//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
       members: [
         {
           email_address: email,
           status: "subscribed",
           merge_fields: {  
              FNAME: firstName,
              LNAME:  lastName,

           }
         }
       ]  
    };

    const jsonData = JSON.stringify(data);
    
    console.log(req.body)

    const url = "https://us17.api.mailchimp.com/3.0/lists/66865345ab";

    const options = {
        method: "POST",
        auth: "Criss1:795a9ed8f437f267a25360e921160f32-us17"
    }

    const request = https.request(url, options, function(response) {

        console.log('status code: ' + response.statusCode);
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        // response.on("data", function(data){
        //     console.log(JSON.parse(data));
        // })
    })

    request.write(jsonData);
    request.end();

});


app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})





// API Key
// 7a89fdfd09a0cc5993cdf508f45678af-us17
// List Id 
// 66865345ab