const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
    //Normal Version
    //const notes = await Note.find();
    //Modiefied version: sorting by date inserted by user
    //Sort Asc = 1     Sort Desc= -1
    const mysort= {date : 1};
    //sorting the notes list by date
    const notes = await Note.find().sort(mysort);
    res.json(notes);;
};

notesCtrl.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author
    });
    await newNote.save();
    res.json('New Note added');
};

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json('Note Deleted');
}

notesCtrl.updateNote = async (req, res) => {
    const { title, content, duration, date, author } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        content,
        duration,
        author
    });
    res.json('Note Updated');
}

module.exports = notesCtrl;
