const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	Country: { type: String, required: false },
	Phone: { type: Number, required: false },
	Newsletters: { type: Boolean, required: false },
	Proverbs: []
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
