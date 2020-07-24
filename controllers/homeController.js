// Defining The Home Page Controller Here
const greeting = async (req, res, next) => {
    res.status(200)
        .json({
            status: "Success",
            data: {
                msg: "Hello world"
            }
        });
}

module.exports = {
    greeting
}
