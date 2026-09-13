import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
    origin : "http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// app.use("/api/product",productRoutes)
// app.use("/api/post",postRoutes)                  <--examples
// app.use("/api/payment",paymentRoutes)
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server start on PORT:", PORT);
  });
});

/*
What is a EndPoint?
An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource.

app.get("/api/notes",(req,res)=>{
    //send the notes
    res.status(200).send("you got 1000 notes");
})

app.post("/api/notes",(req,res)=>{
    res.status(201).json({
        message:"Note created successfully!"
    })
})

app.put("/api/notes/:id",(req,res)=>{           //  https://localhost:5001/api/notes/21
    res.status(200).json({
        message:"Note updated successfully!"
    })
})

app.delete("/api/notes/:id",(req,res)=>{           //  https://localhost:5001/api/notes/21
    res.status(200).json({
        message:"Note deleted successfully!"
    })
})

app.listen(5001,()=>{
    console.log("Server start on PORT: 5001")
})

*/
