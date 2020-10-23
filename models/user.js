const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	country: { type: String, required: true },
	phone: { type: Number, required: false },
	newsletters: { type: Boolean, required: false },
	role: { type: String, required: false },
	proverbs: [ { type: mongoose.Types.ObjectId, required: true, ref: 'Proverb' } ]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
