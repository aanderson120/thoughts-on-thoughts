const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// --------------html routes--------------------//
app.get("/", function(req, res) { 
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
    let noteArray = [];
    let newNote = req.body;

    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        notesArray = JSON.parse(data);

        if(noteArray.length === 0){
            newNote.id=1;
        }
        if(noteArray.length > 0) {
            let currLength = noteArray.length;
            newNote.id = note_array[currLength -1].id + 1;
        }

        noteArray.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(noteArray), (err) => {
            if (err) throw err;
        });
    });
    res.json(newNote);
  });

  // deletes notes
  app.delete("/api/notes/:id", (req, res) => {
      let noteId = parseInt(req.params.id);
      fs.readFile("db/db.json", (err, data) => {
          if (err) throw err;
          let noteArray = JSON.parse(data);
          for (let i = 0; i <notesArray.length; i++) {
              if (noteId ===notesArray[i].id) {
                  res.json(notesArray.splice(i, 1));
              }
          }

          fs.writeFile("db/db.json", JSON.stringify(notesArray), (err) => {
              if (err) throw err;
          });

      });
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });