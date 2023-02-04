
const fs = require("fs");
const express = require("express");
const path = require("path");

// Initialize Express
const app = express();
// Set the Port
const PORT = process.env.PORT || 3000;

// Serve Static files from Public folder
app.use(express.static("public"));
// Use JSON and URL encoded data as input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to the Notes Page
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Route to retrieve saved notes as JSON
app.get("/api/notes", (req, res) => {
res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Route to Main Page
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Route to save new notes
app.post("/api/notes", (req, res) => {
let newNote = req.body;
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
let id = notes.length.toString();

newNote.id = id;
notes.push(newNote);

fs.writeFileSync("./db/db.json", JSON.stringify(notes));
res.json(notes);
});

// Route to delete notes based on id
app.delete("/api/notes/:id", (req, res) => {
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
let id = req.params.id.toString();

notes = notes.filter(note => note.id !== id);

fs.writeFileSync("./db/db.json", JSON.stringify(notes));
res.json(notes);
});

// Listen on specified port
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));