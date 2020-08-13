

var timer = document.getElementById("timer");
var timeElapsed = 0;
var setTimer = 61;
var testPara = document.getElementById("testPara");
var textArea = document.getElementById("textArea");

var passage1 = "Warm up your fingers by typing these short test instructions. The test text is shown in the upper part of the screen. Type it as quickly and accurately as possible until the test time is up. The text you have typed is shown in the lower part of the screen. There you can see if you have made any typing errors. You can use backspace to correct typing errors, but do not spend too much time going back. Do not press enter after each line - only when the paragraph ends.";
var passage2 = "Aesop's Fables, the fables originally belonged to the oral tradition and were not collected for some three centuries after Aesop's death. By that time a variety of other stories, jokes and proverbs were being ascribed to him, although some of that material was from sources earlier than him or came from beyond the Greek cultural sphere. The process of inclusion has continued until the present, with some of the fables unrecorded before the Late Middle Ages and others arriving from outside Europe. The process is continuous and new stories are still being added to the Aesop corpus, even when they are demonstrably more recent work and sometimes from known authors.";
var passage3 = "Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design, interface design, authoring, including standardised code and proprietary software, user experience design, and search engine optimization.";

var start = false


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

if (history.pushState != undefined) {
	history.pushState(null, null, location.href);
}
history.back();
history.forward();
window.onpopstate = function () {
	history.go(1);
};

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


var generatePassage = function(){
	
	var passages = [passage1, passage2, passage3];
	var randomNumber = Math.floor(Math.random()*(3))
	testPara.innerHTML = passages[randomNumber];

};

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


generatePassage();


$("#textArea").keydown(function(){
	if (!start) {
		countdown(setTimer)
		start = true
	}
})

$("#proceedButton").click(function() {
	window.location.replace('./initialExam.html');
})

// $("#reset").click(function() {
// 	sessionStorage.clear();
// 	window.location.reload();
// })


document.addEventListener("keyup", function (e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
	if (keyCode == 44) {
		stopPrntScr();
	}
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