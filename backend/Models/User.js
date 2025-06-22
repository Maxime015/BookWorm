import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profileImage: {
        type: String,
        default: "",
    },
},
    { timestamps: true, }
);

// Hash password before saving the user 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcryptjs.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;