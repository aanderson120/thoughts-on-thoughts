const uuidv1 = require("uuid");
const fs = require ("fs");
const dataBase = require ("../db/db.json");

module.exports = function (app) {
 
  //reads saved notes
  app.get("/api/notes", (req, res) => {
      res.json(dataBase);
  });

  //creates notes
  app.post("/api/notes", (req, res) => {
    const uuid = uuidv1
    const newNote = req.body
    newNote.id = uuid
    dataBase.push(newNote);
    res.json(dataBase);
  }); 
  

  // deletes notes
  app.delete("/api/notes/:id", (req, res) => {
    let note_id = parseInt(req.params.id);

    fs.readFile("db/db.JSON", (err, data) => {
        if (err) throw err;

        let notes_array = JSON.parse(data);

        for (let i = 0; i < notes_array.length; i++) {
            if (note_id === notes_array[i].id) {
                res.json(notes_array.splice(i, 1));
            }
        }

        fs.writeFile("db/db.JSON", JSON.stringify(notes_array), (err) => {
            if (err) throw err;
        });
    });

});
}