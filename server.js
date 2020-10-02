const express = require('express');
const app = express();
const fs = require("fs");
const port = process.env.PORT || 8080;
const path = require('path');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./public/assets/js/index");

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/notes.html'));
})

app.get('/api/notes', function(req, res) {
    fs.readFile('./db.json', 'utf-8', function(err, data) {
        if (err){
            console.log(err);
            return res.status(500).json({
                error: true,
                data: null,
                message: "Unable to retreive notes.",
            });
        }
        res.json({
            error: false,
            data: JSON.parse(data),
            message: "Sucessfully retreived notes.",
        });
    })
})
  
app.post('/api/notes', function(req, res) {
    console.log(req.body);
    fs.readFile('./db.json', 'utf-8', function(err, data) {
        if (err) throw err;
        console.log(data);
        const updatedData = JSON.parse(data);
        updatedData.push(req.body);
        console.log(updatedData);
        fs.writeFile('./db.json', JSON.stringify(updatedData), function(err) {
        if (err) throw err;
        res.json({
            error: false,
            data: updatedData,
            message: "Successfully added new notes.",
            });
        });
    });
});


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});