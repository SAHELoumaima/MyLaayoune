import { Schema,model } from 'mongoose';
import { hash , compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

// Load environment variables

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true  }, // Ensure email uniqueness
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false, required:true },
},
{ timestamps: true }
);


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await hash(this.password, 10);
      return next();
    }
    return next();
  });

UserSchema.methods.generateJWT = async function () {
    return await sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };


  UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};



const User = model("User", UserSchema);
export default User;
