const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new note
router.post(
  "/addnote",
  fetchUser,
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("description").isLength({ min: 5 }).withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Error adding note:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update an existing note
router.put(
  "/updatenote/:id",
  fetchUser,
  async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
      // Find the note to be updated
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Allow updation only if user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Update the note
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error("Error updating note:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);



// router 4 delete note 
router.delete(
  "/deletenote/:id",
  fetchUser,
  async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
      // Find the note to be updated and deelted
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Allow deletion only if user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Update the note
      note = await Notes.findByIdAndDelete(
        req.params.id,
      
      );
      res.json({ "success ":"note has been deleted",note:note });
    } catch (error) {
      console.error("Error updating note:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);



module.exports = router;
