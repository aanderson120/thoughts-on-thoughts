const { v4: uuidv4 } = require('uuid');
const dataBase = require ("../db/db.json");

module.exports = function (app) {
 
  //reads saved notes
  app.get("/api/notes", (req, res) => {
      res.json(dataBase);
  });

  //creates notes
  app.post("/api/notes", (req, res) => {
    let newNote = req.body
    let id = uuidv4();
    newNote.id = id;
    dataBase.push(newNote);
    res.json(dataBase);
  }); 
  

  // deletes notes
  app.delete("/api/notes/:id", (req, res) => {
    let noteId = (req.params.id);

    for (let i = 0; i < dataBase.length; i++ ) {
      if (dataBase[i].id === noteId) {
        dataBase.splice(i,1);
        break
      }
    }
    res.json(dataBase);
    console.log (dataBase)

  });

}