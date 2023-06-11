const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.route");
const { notesRouter } = require("./routes/notes.route");
const app = express();
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
// app.use(cors());
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://verdant-blini-4070cf.netlify.app');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });

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