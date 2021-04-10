var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var Book       = require("./models/book");
var Comment    = require("./models/comments");
var seedDB     = require("./seeds");
var methodOverride = require("method-override");
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
//seedDB();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//===========================
//	LANDING&ABOUT ROUTES
//===========================

app.get("/",function(req,res){
	res.render("landing")
});

app.get("/about",function(req,res){
	res.render("about")
});

//===========================
//	BOOKS ROUTES
//===========================

// INDEX - show all books
app.get("/books",function(req,res){
	//Get all books from DB
	Book.find({}, function(err,allBooks){
		if(err){
			console.log(err);
		} else{
			res.render("books/index",{books:allBooks});
		}
	});
});

// SHOW - shows more info about one book
app.get("/books/:id", function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,foundBook){
		if(err){
			console.log(err);
		} else {
			res.render("books/show", {book:foundBook});
		}
	});
});

//===========================
//	COMMENTS&LIKES ROUTES
//===========================

app.get("/books/:id/comments/new",function(req,res){
	Book.findById(req.params.id, function(err,book){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new",{book:book})
		}
	});
});

app.post("/books/:id/comments", function(req,res){
	// get data from form
	Book.findById(req.params.id, function(err,book){
		if(err){
			console.log(err);
			res.redirect("/books");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					book.comments.push(comment);
					book.save();
					res.redirect("/books/" + book._id);
				}
			});
		}
	});
});

app.post("/books/:id/likes", function(req,res){
	// get data from form
	Book.findById(req.params.id, function(err,book){
		if(err){
			console.log(err);
			res.redirect("/books");
		} else {
			console.log("Number of likes before: "+ book);
			book.likes = book.likes + 1;
			console.log("Number of likes after: " + book.likes);
			Book.findByIdAndUpdate(req.params.id, book, function(err,updatedBook){
				if(err) {
					res.redirect("/books");
				} else {
					res.redirect("/books/"+req.params.id);
				}
			});
		}
	});
});

// process.env.PORT
app.listen(3000, ()=> {
	console.log("Online Library Server has Started!");
});
