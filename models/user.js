const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	country: { type: String, required: false },
	phone: { type: Number, required: false },
	newsletters: { type: Boolean, required: false },
	proverbs: []
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
