import express from 'express';
const router = express.Router();
import { getAllGenres, createOrUpdateGenre, deleteGenre } from '../controllers/genreControllers';

router.get("/", getAllGenres);
router.post("/", createOrUpdateGenre);
router.delete("/", deleteGenre);

export default router;
