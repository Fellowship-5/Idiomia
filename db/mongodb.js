const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose
	.connect(`${process.env.DATABASE_URL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('connected to db');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = mongoose;
