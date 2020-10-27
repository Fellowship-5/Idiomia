const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const proverbSchema = new Schema({
	proverb: { type: String, required: true, maxlength: 250 },
	translation: { type: String, required: true, maxlength: 250 },
	explanation: { type: String, required: true },
<<<<<<< HEAD
	adminApproval: { type: Boolean, required: false },
	contributor: { type: mongoose.Types.ObjectId, required: false, ref: 'User' },
	date: { type: Date }
=======
	adminApproval: { type: Boolean, required: false, default: false },
	contributor: { type: mongoose.Types.ObjectId, required: false, ref: 'User' }
>>>>>>> admin_endpoints_approving_proverbs
});

proverbSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Proverb', proverbSchema);
