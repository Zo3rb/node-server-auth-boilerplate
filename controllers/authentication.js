const User = require('../models/user');

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
                email
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
    signUp
}
