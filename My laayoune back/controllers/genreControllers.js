import Genre from '../models/genre';

// get all categories
export const getAllGenres = async (req, res) => {
    try {
        const genreList = await Genre.find();
        res.status(200).json(genreList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// create or update categories
export const createOrUpdateGenre = async (req, res) => {
    try {
        const { id, title } = req.body.data;
        const isExist = await Genre.findOne({ title: req.body.data.title });

        let newGenre = "";
        if (id !== "0") {
            newGenre = await Genre.findByIdAndUpdate(id, {
                title,
            });
        } else {
            newGenre = await Genre.create(req.body.data);
        }

        res.status(200).json(newGenre);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// delete categories
export const deleteGenre = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedGenre = await Genre.findByIdAndDelete(id);
        res.json(deletedGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
