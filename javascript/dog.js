/*asynchronus functions and createImage/createText functions based on code from 
https://www.youtube.com/watch?v=AVmGmLFcukM&t=1669s */

async function getImages(){//asynchronus function to retrieve api data (images) from dog.ceo
	const response = await fetch("https://dog.ceo/api/breed/germanshepherd/images/random/20")
	const data = await response.json()//stores json response from fetch call in data const
	createImage(data.message);//uses function below that takes the image src url as an argument
}

getImages();

function createImage(images){//this function maps returned api array and creates inner html
	document.getElementById("api-img").innerHTML = `
	${Object.keys(images).map(function (image){
		return `<div class="col-md-2 col-sm-4 col-xs-6">
					<div class="gallerytile" href="#">
						<div class="tile" id="tile">
							<img src="${images[image]}">
						</div>
					</div>
				<button class="likebutton" onclick="likeButton(${image})">
					<span class="icon icon${image}" id="icon"><i class="far fa-thumbs-up"></i>&nbsp;Like</span>
				</button>
				</div>`
	}).join('')}
	`
}

async function getFacts(){//asynchronus function that retrieves dog facts from herokuapp
	const response = await fetch('https://dogfacts-api.herokuapp.com/api/v1/resources/dogs?number=10')
	const data = await response.json()//stores json response from fetch call in data const
	createText(data);
}

function createText(txt){//this function maps returned api array of dog facts and creates inner html
	document.getElementById("api-facts").innerHTML = `
	${Object.keys(txt).map(function (i){
		return `<h4>${txt[i]["fact"]}</h4>`
	}).join('')}
	`
}


getFacts();

/*below is a function for the like button used in api array almost exactly the same
as the like button in app.js however this one is used as an onclick function within the
javascript generated innerhtml above.*/

var audio = new Audio();//makes a new audio variable called audio
audio.src = "./javascript/doglike.wav";//sets audio variable source to the wav sound bite of a dog barking for like button
//very easy way to add an audio file to implement in event listeners

var like = [];

for(let i = 0; i < like.length; i++){
	like[i] = false;
}

function likeButton(i){
	var j=0;
	if(!like[i]){
		j++;
		like[i] = true;
		$(".icon"+i).html(`
			<i class="fas fa-thumbs-up"></i>&nbsp;Like&nbsp;${j}`);
		audio.play();
	}else{
		j--;
		like[i] = false;
		$(".icon"+i).html(`
			<i class="far fa-thumbs-up"></i>&nbsp;Like`);
	}
}


