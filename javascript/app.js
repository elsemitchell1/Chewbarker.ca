/*Mobile menu Unit 4*/
/*
const menu = document.querySelector('#mobile-menu')//targets id for hamburger (3bars in top right)
const menuLinks = document.querySelector('.navbar__menu')//targets the entire navbar menu including subheadings

menu.addEventListener('click', function() {//event listener for hamburger menu
	menu.classList.toggle('is-active');//if hamburger menu is clicked toggles the css class target to #mobile-menu.is-active and rotates bars to make an X
	menuLinks.classList.toggle('active');//same as above but allows the entire navbar to drop down by targeting the .navbar__menu.active css
});//this section of code by Brian Design is simple yet elegant and adds functionality to the website.
*/

/*JQuery Unit 6 - mobile menu improvement on Unit 4
based on https://www.youtube.com/watch?v=NXJ1wLsllwg
*/

$("#mobile-menu").click(function(){
	$(this).toggleClass("is-active");
	$(".navbar__menu").toggleClass("active");
});

/*Like button code for galleries Unit 4*/

var audio = new Audio();//makes a new audio variable called audio
audio.src = "./javascript/doglike.wav";//sets audio variable source to the wav sound bite of a dog barking for like button
//very easy way to add an audio file to implement in event listeners
const likeBtn = [...document.querySelectorAll(".likebutton")];//creates an array for all elements with the class="likebutton"
const likeIcon = [...document.querySelectorAll(".icon")];//creates an array for all elements with the id="icon"
/*
console.log(likeBtn);I used these console logs to determine if my arrays were working
console.log(likeIcon);
*/
var like = [];//like variable with no defined array length
var j = [];

for (let i = 0; i < likeBtn.length; i++){//for loop to target each element array
	like[i] = false;//sets all like variables to false initially
	j[i] = 0;
	likeBtn[i].addEventListener("click", function(){//click event listener for each button in the array
		if(!like[i]){//if like array element is set to false do this
			j[i]++;
			like[i] = true;//change array element to true when button is clicked
			likeIcon[i].innerHTML = `<i class="fas fa-thumbs-up"></i>&nbsp;Like&nbsp;${j[i]}`//changes html inside of span tag for colored in thumbs up
			audio.play();//plays audio of dog barking so user knows they liked the picture
		}
		else{//if like array element is set to true (alread liked) do this
			like[i] = false;//sets like array element to false
			j[i]--;
			likeIcon[i].innerHTML = `<i class="far fa-thumbs-up"></i>&nbsp;Like`//changes html inside of span tag back to a normal thumbs up
		}
	});
}
/*The above section of code taken and modified from the Web Velocity YouTube tutorial and
 has been modified. The original tutorial was for a single like button which while elegant
 it is not usually the case that a webpage only has a single like button. This meant that
 I had to modify the solution using my knowledge of arrays and for loops to make the event
 listener work on multiple instances of the button for my gallery pages.*/



/*File validation for gallery pages Unit 5
https://www.geeksforgeeks.org/file-type-validation-while-uploading-it-using-javascript/#:~:text=Using%20JavaScript%2C%20you%20can%20easily,complete%20file%20type%20validation%20code.*/

/*function fileValidation() {
	var fileInput = document.getElementById('file');//Targets the Choose File button
              
	var filePath = fileInput.value;//gets the file input value (image.jpg)
          
	// Allowing file type
	var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
              
	if (!allowedExtensions.exec(filePath)) {//this statement gives an alert if the file is not the correct type
		alert('Invalid file type');
		fileInput.value = '';//sets input value to empty string
		return false;
	} else {
	// Image preview
	if (fileInput.files && fileInput.files[0]) {//this statement displays the selected image
		var reader = new FileReader();
		reader.onload = function(e) {
			document.getElementById(
			'imagePreview').innerHTML = 
			`<div><h4>Would you like to send this image?</h4>
			<div class="imageprev"><img src="` + e.target.result + `"/></div></div>`;
		};
                      
		reader.readAsDataURL(fileInput.files[0]);
		}
	}
}*/

/*JQuery Unit 6 - improvement on Unit 5 file validation
https://www.geeksforgeeks.org/preview-an-image-before-uploading-using-jquery/
https://stackoverflow.com/questions/29805909/jquery-how-to-check-if-uploaded-file-is-an-image-without-checking-extensions
*/

$(document).ready(function(){
	$(document).on("change","#file",function(){
		var img = this.files[0];
		var imgType = img["type"];
		var allowedExtensions = ["image/jpg","image/jpeg","image/png"];
		if($.inArray(imgType,allowedExtensions)<0){
			alert("Invalid file type!");
			$("#file").val(null);
		}else{
			$("#imagePreview").html(`
				<div><h4>Would you like to send this image?</h4>
				<div class="imageprev"><img id="imgprv" src="#"/></div></div>`);
			let reader = new FileReader();
			reader.onload = function(event){
				$('#imgprv').attr('src', event.target.result);
			}
			reader.readAsDataURL(img)
		}
	});
});

/*Darkmode Unit 5*/

/*https://stackoverflow.com/questions/25305719/change-css-for-all-elements-from-js
https://stackoverflow.com/questions/69899224/how-can-i-use-localstorage-to-make-the-browser-remember-a-classlist-toggle-state*/

/*window.addEventListener("load",function() {//this function runs when the page is loaded
	const darkbtn = document.getElementById("darklight");//targets the darkmode button at the bottom of each page
	var element = document.querySelectorAll('*');//selects all html elements to change the background and color attributes
  	var theme = localStorage.getItem("theme");//gets variable theme as theme from local storage.
  	for(var i = 0; i < element.length; i++){
  		element[i].classList.toggle(theme+"-mode");//adds dark or light mode to the class list
  	}
  	darkbtn.addEventListener("click", function () {//this function runs when darkmode button is clicked
	  	for(var i = 0; i < element.length; i++){
	  		element[i].classList.toggle("dark-mode")//toggles dark-mode to all class lists
	  	}
	  	if(element[0].classList.contains("dark-mode")){//checks the first element in array(they should all be the same)
	  		localStorage.setItem("theme","dark");//if the class list contains dark-mode sets theme in local storage to dark
		}else{
	  		localStorage.setItem("theme","");//if the class list does not contain dark-mode sets theme in local storage to empty string
	  	}
	});
});*/

/*JQuery Unit 6 - improvement on Unit 5 Darkmode
https://stackoverflow.com/questions/65986237/jquery-toggle-dark-mode-using-local-storage-and-prefers-color-scheme
*/

$(document).ready(function(){
	if(!localStorage.getItem("theme")){
		localStorage.setItem("theme","light");
	} 
	if(localStorage.getItem("theme")){
		if(localStorage.getItem("theme")=="dark"){
			$("*").addClass("dark-mode");
		}else{
			$("*").removeClass("dark-mode");
		}
	}
	$("#darklight").click(function(){
		if($("*").hasClass("dark-mode")){
			$("*").removeClass("dark-mode");
			localStorage.setItem("theme","light");
		}else{
			$("*").addClass("dark-mode");
			localStorage.setItem("theme","dark");
		}
	})
})



