import Business from '../models/business';
import Genre from '../models/genre';

// get all business
const getAllBusiness = async (req, res) => {
    try {
        const usersList = await Business.find().select("title ratings desc genre phone email localisation webLink faceBook instagram twiter");
        res.status(200).json(usersList);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// get all categories
const getAllGenres = async (req, res) => {
    try {
        const usersList = await Genre.find().select("title");
        res.status(200).json(usersList);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// get all business
const getBusinessWithGenre = async (req, res) => {
    try {
        const usersList = await Business.find()
            .where("genre")
            .ne([])
            .select("title ratings desc genre imageName phone email localisation webLink faceBook instagram twiter")
            .populate("genre");
        res.status(200).json(usersList);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// search business
const searchBusiness = async (req, res) => {
    try {
        const { name } = req.query;
        const businesses = await Business.find({
            name: { $regex: new RegExp(name, 'i') } 
        }).select("title ratings desc genre imageName phone email localisation webLink facebook instagram twiter");

        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update business
const updateBusiness = async (req, res) => {
    try {
        const business = {
            imageName: req.body.image,
            title: req.body.title,
            ratings: req.body.ratings,
            desc: req.body.desc,
            genre: req.body.genre,
            phone: req.body.phone,
            email: req.body.email,
            localisation: req.body.localisation,
            webLink: req.body.webLink,
            faceBook: req.body.faceBook,
            instagram: req.body.instagram,
            twiter: req.body.twiter,
        };
        const businessList = await Business.findByIdAndUpdate(req.body.id, {
            ...business,
        });
        res.status(200).json(businessList);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// get business by id
const getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.body.id);
        res.json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// create new business
const createBusiness = async (req, res) => {
    try {
        const isExist = await Business.findOne({ title: req.body.title });
        if (!isExist) {
            const businessList = await Business.create(req.body);
            return res.status(200).json(businessList);
        }

        return res.status(400).json({
            message: "business with this name already exist",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// filter business by category
const filterBusiness = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const { selectedGenres, filterStar } = req.body;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(pageSize);
        const skipCount = (pageNumber - 1) * limitNumber;
        let filter = {};
        if (selectedGenres.length > 0) {
            const genreId = selectedGenres.map((genre) => genre.value);
            filter.genre = { $all: genreId };
        }
        if (filterStar > 0) {
            filter.ratings = (filterStar - 1) * 25;
        }
        let filterList = await Business
            .find(filter)
            .populate("genre")
            .sort({ createdAt: "desc" })
            .skip(skipCount)
            .limit(limitNumber);
        const totalCount = await Business.countDocuments(filter);
        const totalPage = Math.ceil(totalCount / limitNumber);
        res.json({
            businessList: filterList,
            pageNumber,
            totalPage,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// delet business 
const deleteBusiness = async (req, res) => {
    const deletedbusiness = await Business.findByIdAndDelete(req.body.id);
    res.json(deletedbusiness);
};

// get all business by categories
const getAllBusinessByGenre = async (req, res) => {
    let { slug } = req.params;
    Business.find({ genre: slug }).then((reslt) => {
        res.json(reslt);
    });
};

export default {
    getAllBusiness,
    getAllGenres,
    getBusinessWithGenre,
    updateBusiness,
    getBusinessById,
    createBusiness,
    filterBusiness,
    deleteBusiness,
    getAllBusinessByGenre,
    searchBusiness,
};
