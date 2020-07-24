const app = require('./index');
const mongoose = require('mongoose');

const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};
const DB_URI = 'mongodb://localhost:27017/auth_bp';
const port = process.env.PORT || 5000;

mongoose.connect(DB_URI, DB_OPTIONS, () => {
    console.log(`Successfully Connected to Database`);
});

app.listen(port, () => console.log(`Server is Up and Running on Port: ${port}`));
