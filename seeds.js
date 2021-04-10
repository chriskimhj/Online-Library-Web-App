var mongoose   = require("mongoose");
var Book       = require("./models/book");
var Comment    = require("./models/comments")

var data = [
	{
		name: "Pride and Prejudice",
		author:"Jane Austen",
		content:"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters. “My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?” Mr. Bennet replied that he had not. “But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.” Mr. Bennet made no answer. “Do you not want to know who has taken it?” cried his wife impatiently. “You want to tell me, and I have no objection to hearing it.” This was invitation enough.",
		likes: 0
	},
	{
		name: "Pride and Prejudice",
		author:"Jane Austen",
		content:"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters. “My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?” Mr. Bennet replied that he had not. “But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.” Mr. Bennet made no answer. “Do you not want to know who has taken it?” cried his wife impatiently. “You want to tell me, and I have no objection to hearing it.” This was invitation enough.",
		likes: 0
	}
];

function seedDB(){
	//Remove all books
	Book.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed books");
		
		//add a few books
		data.forEach(function(seed){
			Book.create(seed,function(err, book){
				if(err) {
					console.log(err);
				} else {
					console.log("added a book")
					
					Comment.create(
						{
							text:"This book is great, but no romance!",
							author:"Homer"
						}, function(err,comment){
						if(err){
							console.log(err);
						} else {
							book.comments.push(comment);
							book.save();
							console.log("created a new comment")
						}
						
					});
				}
			});
		});
	});
}

module.exports = seedDB;