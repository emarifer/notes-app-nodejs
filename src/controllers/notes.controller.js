const Note = require('../models/notes');
const { prefix } = require('../helpers/prefixer');

module.exports = {
    renderNoteForm: (req, res) => res.render('notes/new-note'),
    createNewNote: async (req, res) => {
        const { title, description } = req.body;
        const newNote = new Note({ title, description });
        newNote.uid = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note Add Successfully.');
        res.redirect(`${prefix()}/notes`);
    },
    renderNotes: async (req, res) => {
        const notes = await Note.find({ uid: req.user.id }).lean(); // VER NOTA-1 ABAJO
        res.render('notes/all-notes', { notes });
    },
    renderEditForm: async (req, res) => {
        const note = await Note.findById(req.params.id).lean();
        if (note.uid !== req.user.id) {
            req.flash('error_msg', 'Not Authorized.');
            return res.redirect(`${prefix()}/notes`);
        }
        res.render('notes/edit-note', { note, subpath: true });
    },
    updateNote: async (req, res) => {
        const { title, description } = req.body;
        await Note.findByIdAndUpdate(req.params.id, { title, description });
        req.flash('success_msg', 'Note Updated Successfully.');
        res.redirect(`${prefix()}/notes`);
    },
    deleteNote: async (req, res) => {
        await Note.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Note Deleted Successfully.');
        res.redirect(`${prefix()}/notes`);
    }
};

/* 
    NOTA-1. HANDLEBARS TIENE UN PROBLEMA DE RENDERIZACION DE LOS ELEMENTOS DEL ARRAY QUE DEVUELVE MONGOOSE (DE MONGODB) CUANDO NO SE USA EL METODO "lean()" DESPUES DE "find()". EL OBJETO MONGOOSE NO ES INTERPRETADO POR HANDLEBARS; CON "lean()" SIMPLEMENTE DEVUELVE UN ARRAY DE JSON. VER:
    https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is#60368203
*/