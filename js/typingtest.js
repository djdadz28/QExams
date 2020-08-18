var timer = document.getElementById("timer");
var timeElapsed = 0;
var setTimer = 61;
var testPara = document.getElementById("testPara");
var textArea = document.getElementById("textArea");

var start = false

var passage1 = "Warm up your fingers by typing these short test instructions. The test text is shown in the upper part of the screen. Type it as quickly and accurately as possible until the test time is up. The text you have typed is shown in the lower part of the screen. There you can see if you have made any typing errors. You can use backspace to correct typing errors, but do not spend too much time going back. Do not press enter after each line - only when the paragraph ends.";
var passage2 = "While dreams and desires in life give us purpose, discipline molds and polish our path to attain that purpose. Discipline means to follow rules or do things in regular order. It is a very important part of life. Children should be taught to follow discipline while studying, eating or playing. Adults should also lead disciplined lives. Schools and places of work teach us discipline. Friends can also teach each other ways to follow rules and behave properly. Discipline helps us to grow up and become happy and successful.";

var generatePassage = function(){

	var passages = [passage1, passage2];
	var randomNumber = Math.floor(Math.random()*(2))
	var actualPassage = passages[randomNumber];
	return actualPassage;
};


$(function () {  
    $(document).keydown(function (e) {  
        return (e.which || e.keyCode) != 116;  
    });

    $(document).bind("contextmenu",function(e){
        return false;
    });

    $(document).on("keydown", function(e) {
        e = e || window.event;
        if (e.ctrlKey) {
            var c = e.which || e.keyCode;
            if (c == 82) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });

	
});



function calculateScore() {
	var paraSubmitted = textArea.value;
	var submittedWords = paraSubmitted.split(" ");
	var wordCount = submittedWords.length; 

	var testWords = testPara.innerHTML.split(" ");
	var badWords = countIncorrectWords(testWords, submittedWords)
	// var finalScore = (wordCount - (badWords/setTimer).toFixed(0));
	var accuracy = getAccuracy(wordCount, badWords);
	var finalScore = Math.ceil((wordCount-badWords)/(timeElapsed/60))
	// var finalScore = 
	
	return finalScore < 0 ? [0, accuracy] : [finalScore, accuracy]
};

function getAccuracy(userWords, incorrectWords){
	if (incorrectWords === 0) {
		return 100
	}
	var totalWords = userWords;
	var totalCorrect = (totalWords - incorrectWords);
	var result = parseInt(((totalCorrect / totalWords)*100).toFixed(0));
	return result;
};


function countIncorrectWords(correctWords, userWords){
	var incorrectWords = 0

	for(var i = 0; i < userWords.length; i++){
		if (userWords[i] !== correctWords[i]) {
			incorrectWords += 1
		}
	}
	return incorrectWords
}

function countdown(seconds) {

    seconds = parseInt(sessionStorage.getItem("seconds"))||seconds;
	timeElapsed = parseInt(sessionStorage.getItem("elapsed")) || timeElapsed;
    function tick() {
        seconds--;
		timeElapsed++;
		sessionStorage.setItem("elapsed", timeElapsed)
        sessionStorage.setItem("seconds", seconds)
        var current_minutes = parseInt(seconds/60);
        var current_seconds = seconds % 60;
		var finalScore = calculateScore()
		$("#typingSpeed").text(finalScore[0]);
		$("#typingAccuracy").text(finalScore[1] + "%");
        $("#timer").text(current_minutes + ":" + (current_seconds < 10 ? "0" : "") + current_seconds);
		
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        }else{
			var attempts = parseInt(sessionStorage.getItem('attempts')) || 1;
			sessionStorage.setItem('attempts', 1 + attempts);
			if (attempts <= 3) {

				//Store all attempts score in sessionStorage
				var score = []
				score = JSON.parse(sessionStorage.getItem('score')) || []
				score.push(finalScore);
				sessionStorage.setItem('score', JSON.stringify(score));

				$("#reattemptButton").html("<span class=\"fa fa-repeat\"></span> Reattempt: " + (3 - attempts) + " left")
				$("#typingcompletedDialogModal").modal('toggle');

				var scoreList = JSON.parse(sessionStorage.getItem('score'));
				var top = [0, 0];
				
				if (attempts === 3) {
					$("#reattemptButton").addClass("disabled").removeClass("btn-info")
				}

				if (attempts < 2) {
					top[0] = scoreList[0][0]
					top[1] = scoreList[0][1]
					$("#topSpeed").text(scoreList[0][0] + " wpm")
					$("#topAccuracy").text(scoreList[0][1] + "%")
				}else{
					for(var i = 0; i < scoreList.length; i++){
						if(scoreList[i][0] > top[0]){
							top[0] = scoreList[i][0]
						}
						if(scoreList[i][1] > top[1]){
							top[1] = scoreList[i][1]
						}
					}
					$("#topSpeed").text(top[0] + " wpm");
					$("#topAccuracy").text(top[1] + "%");
				}
				if (attempts < 3) {
					$("#reattemptButton").click(function() {
						sessionStorage.setItem("elapsed", 0);
						sessionStorage.setItem("seconds", 0);
						sessionStorage.setItem("attempts", attempts + 1 )
						window.location.reload();
					});
				}
				

				sessionStorage.setItem('typingScores', JSON.stringify(top))
				
			}
        }
    }
    tick();         
}



$(document).ready(function() {


	var paragraph = generatePassage();
	testPara.innerHTML = paragraph;
	
	if (history.pushState != undefined) {
	history.pushState(null, null, location.href);
	}
	history.back();
	history.forward();
	window.onpopstate = function () {
		history.go(1);
	};

	
	
	$("#textArea").keydown(function(){
		if (!start) {
			countdown(setTimer)
			start = true
		}
	})

	$("#proceedButton").click(function() {
		var typing_score = sessionStorage.getItem('typingScores');
		var applicant_id = sessionStorage.getItem('test_id');
		var rootRef = database.ref("Records");

            
		$(this).attr("disabled", true).text("Submitting...")
		rootRef.child(applicant_id).update({'typing_score': typing_score})
				.then(function() {
					window.location.replace('./initialExam.html');
				}).catch(function(e){
					console.error(e)
		})
	})
});

function stopPrntScr() {

        var inpFld = document.createElement("input");
        inpFld.setAttribute("value", ".");
        inpFld.setAttribute("width", "0");
        inpFld.style.height = "0px";
        inpFld.style.width = "0px";
        inpFld.style.border = "0px";
        document.body.appendChild(inpFld);
        inpFld.select();
        document.execCommand("copy");
        inpFld.remove(inpFld);
}

document.addEventListener("keyup", function (e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
	if (keyCode == 44) {
		stopPrntScr();
	}
});


