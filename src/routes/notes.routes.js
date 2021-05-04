const { Router } = require('express');
const router = Router(); // O bien: const router = require('express').Router();
const { 
    renderNoteForm,
    createNewNote, 
    renderNotes, 
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');
const { isAuthenticated } = require('../helpers/auth');

// New Note
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, createNewNote); // Daria igual si la ruta fuese la misma que la anterior con el metodo "get"

// Get All Notes
router.get('/notes', isAuthenticated, renderNotes);

// Edit Note
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, updateNote);

// Delete Note
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;