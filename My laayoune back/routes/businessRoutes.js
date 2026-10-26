import express from 'express';
const router = express.Router();
import businessControllers from '../controllers/businessControllers';



// Admin routes
router.get("/", businessControllers.getAllBusiness);
router.get("/genre", businessControllers.getAllGenres);
router.get("/businessWithGenre", businessControllers.getBusinessWithGenre);
router.get("/search", businessControllers.searchBusiness)
router.put("/update", businessControllers.updateBusiness);
router.post("/businessById", businessControllers.getBusinessById);
router.post("/CreateBusiness", businessControllers.createBusiness);
router.post("/filter", businessControllers.filterBusiness);
router.delete("/", businessControllers.deleteBusiness);

router.get('/getAllBusiness/:slug', businessControllers.getAllBusinessByGenre);

// router.post('/:id/reviews', businessControllers.addReview);
router.get('/:id', businessControllers.getBusinessById);

export default router;

