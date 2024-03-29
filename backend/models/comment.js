const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("comment", CommentSchema);
