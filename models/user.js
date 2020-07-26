// Create User Model Here
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "User Email Should Be a Unique Email"],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (done) {
    const hashedPassword = await bcrypt.hash(this.password, 8);
    this.password = hashedPassword;
    done();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
