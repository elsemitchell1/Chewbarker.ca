/* Quiz for if user should get a german shepherd. Unit 5
Based on code from
https://gist.github.com/slopeofhope81/9093298*/

var allQuestions = [{//array of questions with choices and answer as array index
	question: "Question 1: Have you had experience with dogs in the past?",
	choices: ["Yes", "No"],
	answer:0},
	{question: "Question 2: Are you physically active?(German Shepherds love to run)",
	choices: ["Yes", "No"],
	answer:0},
	{question: "Question 3: Do you have at least an hour each day to play with your dog?",
	choices: ["Yes", "No"],
	answer:0},
	{question: "Question 4: Do you have small children?",
	choices: ["Yes", "No"],
	answer:1},
	{question: "Question 5: Are there experienced dog trainers in your area?",
	choices: ["Yes", "No"],
	answer:0},
	{question: "Question 6: Do you own a good vacuum?",
	choices: ["Yes", "No"],
	answer:0},
	{question: "Question 7: Do you mind having pet hair on everything?",
	choices: ["Yes", "No"],
	answer:1},
	{question: "Question 8: Do you mind dogs barking?",
	choices: ["Yes", "No"],
	answer:1},
	{question: "Question 9: Is your yard fenced?",
	choices: ["Yes", "No"],
	answer:0},
	{question: "Question 10: Do you want a 100lb lap dog?",
	choices: ["Yes", "No"],
	answer:0}];

var score = 0;//keeps count of correct answers
var currentNumber = 0;//keeps track of current question

function createQuestion(){//this function inserts the above questions into html element question
	for(var i=0; i < allQuestions[currentNumber].choices.length; i++){
		document.forms.radioAnswers.elements.choice[i].checked = false;//each new question starts with no radio button selected
	}
	var question = document.getElementById("question");
	question.innerHTML = '<h4 class="quiz">'+allQuestions[currentNumber].question+' </h4>';
	createChoices();
}
function createChoices(){//this function inserts the options for the corresponding question (yes or no)
	for(var i = 0; i < allQuestions[currentNumber].choices.length; i++){
		var option = document.getElementById("label"+i);
		option.innerHTML = '<h4 class="choices">'+allQuestions[currentNumber].choices[i]+' </h4>';
	}
}
var button = document.getElementById("next");//targets the next question button on home page

function showScore(){//this function displays the users score once the quiz is completed
	var point = document.getElementById("point");
	var suggest = document.getElementById("suggest");
	point.innerHTML = '<h4 class="quiz">Your score: '+score+' </h4>';
	if(score>8){//the next statements give the user feedback on if they should get a GSD based on their score
		suggest.innerHTML = '<h4 class="quiz">You should definitely get a German Shepherd!</h4>';
	}
	else if(score>5){
		suggest.innerHTML = '<h4 class="quiz">German Shepherds are a lot of work! Maybe you should do some more research.</h4>';
	}
	else if(score<=5){
		suggest.innerHTML = '<h4 class="quiz">Maybe you should reconsider getting a German Shepherd.</h4>';
	}
	document.forms.radioAnswers.style.display="none";//the following code hides the last question
	var question = document.getElementById("question");
	question.style.display = "none";
	var elt = document.getElementById("point");//then displays the score once the quiz is finished
	elt.style.display = "block";
	button.style.display = "none";
}

button.addEventListener("click", function(){//this function generates the next question when the button is clicked
	var userAnswer = document.forms.radioAnswers.elements.choice.value;//stores the user answer
	
	for(var i=0; i < allQuestions[currentNumber].choices.length; i++){
		if(document.forms.radioAnswers.elements.choice[i].checked == true && 
			userAnswer == allQuestions[currentNumber].answer){
			score++;//if one of the choices is checked and the answer is true a point is added to the score
		}
	}
	currentNumber++;//increments the current number so the correct question is displayed next
	if(currentNumber == allQuestions.length){
		showScore();//if the quiz is over your score is printed
	} else {
		createQuestion();//otherwise the next question will be generated.
	}
});

window.onload=createQuestion();//creates the first question when the window is loaded


