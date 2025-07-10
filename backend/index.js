// file: server.js
import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookroute from "./routes/bookroutes.js"
import cors from 'cors'

const app = express();

// Optional: built‑in JSON body parsing
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use((req, res, next) => {
  console.log("Body:", req.body);
  next();
});


app.get("/", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  return res.status(200).send("Welcome");
});
app.use('/books',bookroute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });


app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`)
});

