import { Schema, model } from 'mongoose';

const genreSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 200,
      required: true,


    }
  });
const Genre = model("Genre", genreSchema);
export default Genre;
