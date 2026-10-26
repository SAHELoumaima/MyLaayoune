import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import cors from "cors"
import { errorResponserHandler,invalidPathHandler } from './middleware/errorHandler';

// Routes
import userRoutes from './routes/userRoutes';
import businessRoutes from './routes/businessRoutes';
import genreRoutes from './routes/genreRoutes';
import commentRoutes from './routes/commentRoutes'



dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());


// app.get('/',(req,res) => {
//     res.send("server is running....");
// });

app.use('/api/users', userRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/genres', genreRoutes);
app.use("/api/comments", commentRoutes);


// static assets
app.use("/uploads", express.static(path.join(__dirname,"/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);



const PORT = process.env.PORT || 7000;

app.listen(PORT,() =>console.log(`server is running on port ${PORT}`));