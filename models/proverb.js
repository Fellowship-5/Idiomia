const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const proverbSchema = new Schema({
	proverb: { type: String, required: true, maxlength: 250 },
	translation: { type: String, required: true, maxlength: 250 },
	explanation: { type: String, required: true },
	adminApproval: { type: Boolean, required: false },
	userId: { type: String, required: false }
});

proverbSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Proverb', proverbSchema);
