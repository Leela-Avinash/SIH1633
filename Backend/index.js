import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";

dotenv.config();
connectDB();

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };
  
app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes); 
app.use("/api/messages", messageRoutes);

const PORT =  5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


// // File upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//   try {
//     console.log(req.file);
//       res.status(200).json({
//           message: 'File uploaded successfully',
//           file: req.file,
//       });
//   } catch (error) {
//       res.status(500).send('Error uploading file');
//   }
// });
