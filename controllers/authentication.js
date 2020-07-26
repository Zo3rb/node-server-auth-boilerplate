const User = require('../models/user');
require('../passportService/passport');
const jwt = require('jwt-simple');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

const tokenForUser = user => {
    const timeStamps = new Date().getDate();
    const token = jwt.encode({ sub: user._id, iat: timeStamps }, process.env.JWT_SECRET);
    return token;
}

// Sign In Controller
const signIn = async (req, res, next) => {
    try {
        res.status(200)
            .json({
                status: "Success",
                data: {
                    token: tokenForUser(req.user)
                }
            });
    } catch (error) {
        res.status(400)
            .json({
                status: "Fail",
                data: {
                    msg: "Something Went Wrong Please Try Again"
                }
            });
    }
}

// Sign Up Controller
const signUp = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // Checking if The User Entered Email & Password
        if (!email || !password) res.status(400).send({ msg: "You Have to Provide an Email & Password" });

        // Check if The User is in The DB
        const registeredUser = await User.findOne({ email });
        if (registeredUser) res.status(400).send({ msg: "Email is Already Signed Up" });

        // if Not Registered Save it in The Database
        const user = await User.create({ email, password });
        res.status(201).json({
            status: "Created",
            data: {
                email,
                token: tokenForUser(user)
            }
        });

    } catch (error) {
        res.status(400)
            .json({
                status: "Fail",
                error
            });
    }
}

module.exports = {
    signUp,
    signIn,
    requireAuth,
    requireSignIn
};
