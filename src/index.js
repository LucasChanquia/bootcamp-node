require("dotenv").config();
require("./mongo");

const express = require("express"); // common JS
const app = express();
const cors = require("cors");
const Note = require("../models/Note");

app.use(cors());
app.use(express.json());

let notes = [];

// const app = http.createServer((request,response) =>{
//     response.writeHead(200,{'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

// const generateId = () => {
//   const ids = notes.map((note) => note.id);
//   const maxId = Math.max(...ids);
//   return maxId;
// };

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findById(id).then(note =>{
    if(note){
      return res.json(note)
    }else{
      res.status(404).end()
    }
  }).catch(err =>{
    next(err)
  })
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== Number(id));
  res.send(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;

  if (!note.content) {
    return res
      .status(404)
      .json({ error: 'required "content" field is missing' });
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: typeof note.important !== "undefined" ? note.important : false,
  })

  newNote.save().then(savedNote =>{
    res.json(savedNote)
  })
});

app.use((err, req, res, next) => {
  console.error(err)
  console.log(err.name);
  res.status(400).env();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
