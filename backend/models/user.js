const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		min: -1,
	},
	country: String,
	bio: String,
	social: {
		instagram: String,
		twitter: String,
	},
});

module.exports = mongoose.model("user", UserSchema);
