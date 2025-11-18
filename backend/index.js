import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import loopRouter from "./routes/loop.routes.js"
import storyRouter from "./routes/story.routes.js"
import messageRouter from "./routes/message.routes.js"
import { app, server } from "./socket.js"
dotenv.config()

app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://main.d1o7mnrhj60m.amplifyapp.com",
      "https://social-media-platform-l27o.onrender.com"
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }));
  
app.use(express.json())
app.use(cookieParser())

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "Vybe Backend is running!", status: "OK" })
})

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/loop",loopRouter)
app.use("/api/story",storyRouter)
app.use("/api/message",messageRouter)


server.listen(port , ()=>{
    connectDb()
    console.log("server started")
})

