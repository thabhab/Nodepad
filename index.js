const fs = require('fs');
const express = require('express');
const app = express();  //get an express object
const cors = require('cors');  //avoid that nasty CORS error
const { ENETUNREACH } = require('constants');

const portNum = 3000;

let username;

//take care of CORS situation
app.use(cors({origin: '*'}));

//allow body parsing
app.use(express.json());

//second argument is a callback function
//-- this is the function that will be called when 
//   there is an HTTP GET request for this endpoint
app.get('/usernotes.html', (req, res) => {
    
    console.log("get function ran");
    var notes = fs.readFileSync(__dirname+"/"+username+".txt", "utf8");

    res.send(notes);

    
});



app.post('/usernotes.html', (req, res) => {

    console.log(req.body.noteData);
    username = req.body.userName;

    var arr = [];

    if(fs.existsSync(req.body.userName+".txt")) {
        console.log("file exists");
        fs.readFile(req.body.userName+".txt", function(err, data) {
            if (data.length == 0) {
                let emptyArray = JSON.stringify([req.body.noteData]);
                fs.writeFileSync(req.body.userName+".txt", emptyArray);
                console.log("empty and now wrote to it");
            } 
            else {
                let arr = JSON.parse(fs.readFileSync(req.body.userName+".txt"));
                console.log(arr);
                arr.push(req.body.noteData);
                fs.writeFileSync(req.body.userName+".txt", JSON.stringify(arr));
                console.log("was not empty and now wrote to it");

            }
        })
        
    }
    else {
        let emptyArray = JSON.stringify([req.body.noteData]);
        fs.writeFileSync(req.body.userName+".txt", emptyArray);
        console.log("made the file and wrote to it");
    }

    res.send(JSON.stringify("Wrote to file"));
    
});

app.post('/usernotes.html/a', (req, res) => {

    console.log(req.body.noteData);

    var arr = [];

    if(fs.existsSync(username+".txt")) {
        console.log("file exists");
        fs.readFile(username+".txt", function(err, data) {
            if (data.length == 0) {
                let emptyArray = JSON.stringify([req.body.noteData]);
                fs.writeFileSync(username+".txt", emptyArray);
                console.log("empty and now wrote to it");
            } 
            else {
                let arr = JSON.parse(fs.readFileSync(username+".txt"));
                console.log(arr);
                arr.push(req.body.noteData);
                fs.writeFileSync(username+".txt", JSON.stringify(arr));
                console.log("was not empty and now wrote to it");

            }
        })
        
    }
    else {
        let emptyArray = JSON.stringify([req.body.noteData]);
        fs.writeFileSync(username+".txt", emptyArray);
        console.log("made the file and wrote to it");
    }

    res.send(JSON.stringify("Wrote to file"));
    
});

app.post('/usernotes.html/b', (req, res) => {

    console.log(req.body.noteData);

    var arr = [];

    if(fs.existsSync(username+".txt")) {
        console.log("file exists");
        fs.readFile(username+".txt", function(err, data) {
            
            let arr = JSON.parse(fs.readFileSync(username+".txt"))
            console.log(arr);
            arr.splice(req.body.element, 1, req.body.noteData)
            // arr.push(req.body.noteData);
            fs.writeFileSync(username+".txt", JSON.stringify(arr))
            console.log("was not empty and now wrote to it");

            
        })
        
    }
    
    res.send(JSON.stringify("Wrote to file"));
    
});

app.delete('/usernotes.html', (req, res) => {
    
    console.log("delete function ran");
      
    let x = JSON.parse(fs.readFileSync(username+".txt"));
    console.log(req.body.count);
    console.log(x);
    let delCount = 0;
    for(let element=0; element<req.body.count; element++) {
        x.splice(req.body.arra[element]-delCount, 1);
        delCount++;
        console.log(x);

    };

    fs.writeFileSync(username+".txt", JSON.stringify(x));
    console.log("file has been updated with deletions");   

    res.send(JSON.stringify("delete finished running"));

    
});

//make server listen on a port
app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});