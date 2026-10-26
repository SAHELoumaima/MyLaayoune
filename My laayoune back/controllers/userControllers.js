import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import User from "../models/User";
import { fileRemover } from "../utils/fileRemover";

const registerUser = async (req, res, next) => {
try {
    const {name, email, password} = req.body;

    //check whether the user exists or not
    let user = await User.findOne({email});

    if(user) {
        throw new Error("User have already registered"); 
    }

    // creating a new user
   user = await User.create({
    name,
    email,
    password,
   });

   return res.status(201).json({
    // _id: user._id,
    avatar: user.avatar,
    bio: user.bio,
    name: user.name,
    email: user.email,
    // verified: user.verified,
    // admin: user.admin,
    // token: await user.generateJWT() ,
   });


} catch (error) {
   next(error);
}
};


const loginUser = async (req, res, next) => {
    try {
   const {email,password}= req.body;
   
   let user=await User.findOne({email});
   if(!user){
    throw new Error('Email not found');
   
   }
   
   if(await user.comparePassword(password)){
     return res.status(201).json({
       _id:user._id,
       avatar:user.avatar,
       bio:user.bio,
       name:user.name,
       email:user.email,
       verified:user.verified,
       admin: user.admin,
       token:await user.generateJWT(),
     })
   } else {
     throw new Error('Invalid email or password');
   }
    } catch(error){
      next(error);
    }
   };

  const userProfile= async (req, res, next) => {
    try{
      let user=await User.findById(req.user._id)
  
      if(user){
        return res.status(201).json({
          _id:user._id,
          avatar:user.avatar,
          bio:user.bio,
          name:user.name,
          email:user.email,
          verified:user.verified,
          admin: user.admin,
        });
      }else{
        let error = new Error('User not found');
        error.statusCode=404;
        next(error);
      }
    } catch(error){
  next(error);
  
    }
  };
  const updateProfile = async(req, res, next) => {
    try{
      let user= await User.findById(req.user._id);
  
      if(!user){
        throw new Error("User not found");
      }
      user.name=req.body.name || user.name;
      user.email= req.body.email || user.email;
      if(req.body.password && req.body.password.length < 6){
         throw new Error("Password length must be at least 6 character");
      }else if(req.body.password){
        user.password = req.body.password;
      }
      user.bio = req.body.bio || user.bio;
      const updateUserProfile= await user.save();
  
      res.json({
       // _id:updateUserProfile._id,
        avatar:updateUserProfile.avatar,
        bio:updateUserProfile.bio,
        name:updateUserProfile.name,
        email:updateUserProfile.email,
        verified:updateUserProfile.verified,
        admin: updateUserProfile.admin,
       // token:await updateUserProfile.generateJWT(),
      })
      
    } catch(error){
      next(error);
    }
  };

  const updateProfilePicture = async(req, res, next) => {
    try{
       const upload = uploadPicture.single('profilePicture');
  
  
       upload(req,res,async function(err){
        if(err){
          const error= new Error("An unknown error occured when uploading" + err.message );
          next(error);
        }
        else{
          // every thing zent well
          if(req.file){
            let filename;
            const updatedUser = await User.findById(req.user._id);
            filename = updatedUser.avatar;
            if(filename) {
              fileRemover(filename)
            }
           updatedUser.avatar = req.file.filename;
           await updatedUser.save();
  
            res.json({
              _id:updatedUser._id,
              avatar:updatedUser.avatar,
              bio:updatedUser.bio,
              name:updatedUser.name,
              email:updatedUser.email,
              verified:updatedUser.verified,
              admin: updatedUser.admin,
              token:await updatedUser.generateJWT(),
            });
          } else {
            let filename;
            let updatedUser = await User.findById(req.user._id);
            filename = updatedUser.avatar;
            updatedUser.avatar="";
            await updatedUser.save();
            fileRemover(filename);
            res.json({
              _id:updatedUser._id,
              avatar:updatedUser.avatar,
              bio:updatedUser.bio,
              name:updatedUser.name,
              email:updatedUser.email,
              verified:updatedUser.verified,
              admin: updatedUser.admin,
              token:await updatedUser.generateJWT(),
           
  
            })
  
          }
        }
       })
    } catch(error){
      next(error);
    }
  };


export {registerUser,loginUser,userProfile, updateProfile,updateProfilePicture};