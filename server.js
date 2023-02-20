const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT;
const URI = process.env.URI;

mongoose.connect(URI);

const noteSchema = {
    note: String
}

const Note = mongoose.model('Note', noteSchema);

app.get('/', async(req, res) => {
    try {
        const data = await Note.find();
        const response = res.json(data);
    } catch (error) {
        console.log(error);
    }
    res.end();
});

app.post('/', async(req, res) => {
    try {
        const payload = req.body.note;
        const note = {
            note: payload
        }
        await Note.create(note);
    } catch (error) {
        console.log(error);
    }
    res.end();
});

app.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        await Note.findByIdAndDelete({_id: id});
    } catch (error) {
        console.log(error);
    }
    res.end();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
});