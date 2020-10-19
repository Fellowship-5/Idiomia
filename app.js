const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('./db/mongodb');

const userRoutes = require('./routes/users-routes');
const proverbRoutes = require('./routes/proverbs-routes');

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/proverbs', proverbRoutes);

app.listen(PORT, () => {
	console.log('listening on ' + PORT);
});
