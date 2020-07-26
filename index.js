require('dotenv').config({ path: './config.env' });
const express = require('express');
const morgan = require('morgan');

const appRouter = require('./routes/appRouter');

const app = express();

// BI & 3rd Party Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan('tiny'));
}

// Registering The Routers
app.use(appRouter);


module.exports = app;