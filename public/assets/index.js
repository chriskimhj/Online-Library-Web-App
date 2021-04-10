var jumbo = document.querySelector(".jumbotron");
var thumbnail = document.querySelectorAll(".thumbnail");

jumbo.classList.add('show');
jumbo.classList.add('hide');

for(var i=0; i<thumbnail.length; i++){
	thumbnail[i].classList.add('show');
	thumbnail[i].classList.add('hideT');
}

