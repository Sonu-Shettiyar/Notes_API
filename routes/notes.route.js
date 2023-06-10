const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { NoteModel } = require("../models/notes.model");
const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.status(200).json(notes)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

notesRouter.post("/add", auth, async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).json({ "msg": `${req.body.userName}'s Note Added Successfully` })
    } catch (error) {
        res.status(400).json({ "Error": error.message })
    }
})
notesRouter.patch("/update/:id", auth, async (req, res) => {

    const { id } = req.params;
    const payload = req.body;

    try {
        const user = await NoteModel.findOne({ _id: id });
        if (user.userId == req.body.userId) {
            console.log("done")
            await NoteModel.findByIdAndUpdate({ _id: id }, payload);

            res.status(200).json({ "msg": `${req.body.userName} Note Updated Successfully` })
        } else {
            res.json({ "error": "Not Authorized" })
        }

    } catch (error) {
        res.status(400).json({ "Error": error.message })
    }
})
notesRouter.delete("/delete/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await NoteModel.findOne({ _id: id });
        if (user.userId == req.body.userId) {
            console.log("done")
            await NoteModel.findByIdAndDelete({ _id: id });

            res.status(200).json({ "msg": `${req.body.userName} Note Deleted Successfully` })
        } else {
            res.json({ "error": "Not Authorized" })
        }

    } catch (error) {
        res.status(400).json({ "Error": error.message })
    }
})


module.exports = {
    notesRouter
}