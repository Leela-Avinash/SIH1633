import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes); 

const PORT =  5000;
app.listen(PORT, () => {
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
