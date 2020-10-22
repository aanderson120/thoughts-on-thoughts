const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// --------------html routes--------------------//
app.get("*", function(req, res) { 
    res.sendFile(path.join(__dirname, "index.html"));
  });  //home route
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  }); //notes route


// --------------api routes--------------------//
app.get("/api/notes", (req, res) => {
    getSavedNotes()
    .then((savedNotes) => {
        res.send(JSON.parse(savedNotes))
    })
    .catch((err) => res.status(500).json(err));
});
  
  // Create New notes - takes in JSON input
  app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let newNote = {
        title: req.body.title,
        text: req.body.title,
        id: id,
    }
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), (err) => {
        if (err) throw err;
    });
    return res.json(savedNotes);

  });

  // deletes notes
  app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = savedNotes.filter(x=>x.id!=req.params.id)
      fs.writeFileSync("/db/db.json", JSON.stringify(noteID), (err) => {
        if (err) throw err;
      });
      return res.json(savedNotes);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });