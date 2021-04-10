var mongoose  = require("mongoose");

//Schema Setup
var bookSchema = new mongoose.Schema({
	name:String,
	author:String,
	content:String,
	likes:Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Book",bookSchema); 