import { Schema,model } from 'mongoose';


const reviewSchema = new Schema({
  name : { type: String, required: true},
  rating : { type: Number, required: true},
  comment : { type: String, required: true},
  user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref : 'User'
  },
},{ 
  timestamps: true
})


const businessSchema = new Schema  (
  {
   imageName: String,
  title: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2,
    maxLength: 255,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
    default: 0,
  },
  desc:{
    type:String,
    default:" "
  },
  phone:{
    type:String,
    minLength:6,
    required:true,
  },
  email:{
    type:String,
    default:" "
  },
  localisation:{
    type:String,
    default:" "

  },
  webLink:{
    type:String,
    default:" "
  },
  faceBook:{
    type:String,
    default:" "
  },
  instagram:{
    type:String,
    default:" "
  },
  twiter:{
    type:String,
    default:" "
  },
  genre: [
    {
        type: Schema.Types.ObjectId, 
        ref: 'Genre',
    },
  ],
 reviews : [reviewSchema],
 numReviews:{
  type : Number,
  required: true,
  default: 0
},

});

 


  businessSchema.virtual('comments',{
    ref:"Comment",
    localField:"_id",
    foreignField:'business',
  })

  const Business = model("Business", businessSchema);
export default Business