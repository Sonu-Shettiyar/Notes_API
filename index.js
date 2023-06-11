const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.route");
const { notesRouter } = require("./routes/notes.route");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use("/users", userRouter);
app.use("/notes",notesRouter)




app.listen(process.env.Port,async () => {
    
    try {
        await connection;        
        console.log(`Succesfully running at port:: ${process.env.Port}`)
    } catch (error) {
        console.log(error)
    }
})