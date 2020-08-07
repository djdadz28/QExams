var critical_exam_completed = false;
var written_test = sessionStorage.getItem('written_test_completed');

var critical_exam_answers = {
    'question_1': "",
    'question_2': "",
    'question_3': "",
    'question_4': "",
    'question_5': "",
    'question_6': "",
    'question_7': "",
    'question_8': "",
    'question_8_2': "",
    'question_9': "",
    'question_10': ""
};

var test_id = document.getElementById('test_id');

var audio_1 = document.getElementById("audio_1");
var audio_2 = document.getElementById("audio_2");
var audio_3 = document.getElementById("audio_3");
var audio_4 = document.getElementById("audio_4");
var audio_5 = document.getElementById("audio_5");
var audio_test = document.getElementById("audio_test");

var playButton_1 = document.getElementById("play-button-1");
var playButton_2 = document.getElementById("play-button-2");
var playButton_3 = document.getElementById("play-button-3");
var playButton_4 = document.getElementById("play-button-4");
var playButton_5 = document.getElementById("play-button-5");

var volumeCheck = document.getElementById("volumeCheck");

var test_click = false;

var audio_exam_answers = {
    'question_11': "",
    'question_12': "",
    'question_13': "",
    'question_14': "",
    'question_15': ""
}

var all_answers = {}


if(!sessionStorage.getItem('test_id')){
    window.location.replace('./index.html');
}


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





$('document').ready(function() {

    if (written_test === "false") {
        $('#audioExam').hide()
    }else{
        hideWrittenTest_showAudioTest();
    }
    

    $('#incomplete_answer_warning').hide();

        //Critical Exam
    $('#submit_answers').click(function() {

        $("#criticalExam :text").each(function() {
            if($(this).attr("name").length > 0) {
                critical_exam_answers[$(this).attr("name")] = $(this).val();
            }
        });
    
        $("#criticalExam :radio:checked").each(function() {
            if($(this).attr("name").length > 0) {
                critical_exam_answers[$(this).attr("name")] = $(this).val();
            }
        });

        sessionStorage.setItem('answers', JSON.stringify(critical_exam_answers))
    
        for(var keys = Object.keys(critical_exam_answers), i=0, end = 11; i < end; i++){
            var key = keys[i], value = critical_exam_answers[key];
            if (value === "") {
                critical_exam_completed = false;  
                break
            }
            if(i === end -1){
                critical_exam_completed = true;
            }
        }

            if(!critical_exam_completed){
                console.log("answer first")
                $("#incomplete_answer_warning").text("You Skipped Question: " + (i < 8 ? i + 1 : i )).fadeTo(3000, 300).hide(100, function(){
                    $("#incomplete_answer_warning").hide(100);
                })
            }else{
                console.log("completed answer")
                hideWrittenTest_showAudioTest();
            }
    
    });

    countdown(1201);


    //Audio Exam start

    $('#incomplete_answer_warning_1').hide();
    $('#incomplete_answer_warning_2').hide();
    $('#incomplete_answer_warning_3').hide();
    $('#incomplete_answer_warning_4').hide();
    $('#incomplete_answer_warning_5').hide();

    //Volume Check
    $('#volumeCheck').click(function() {
        if(!test_click){
            audio_test.play()
            volumeCheck.innerHTML = "Checking..."
            test_click = true
        }else if(test_click){
            audio_test.pause()
            volumeCheck.innerHTML = "Volume Check"
            test_click = false
        }
    });

    audio_test.onended = function () {
        volumeCheck.innerHTML = "Volume Check"
        test_click = false
    };
    //Play Function

    $("#play-button-1").click(function() {
        audio_1.play()
        $(this).text("Playing...");
    });

    $("#play-button-2").click(function() {
        audio_2.play()
        $(this).text("Playing...");
    });

    $("#play-button-3").click(function() {
        audio_3.play()
        $(this).text("Playing...");
    });

    $("#play-button-4").click(function() {
        audio_4.play()
        $(this).text("Playing...");
    });

    $("#play-button-5").click(function() {
        audio_5.play()
        $(this).text("Playing...");
    });
    


    // End Function

    audio_1.onended = function () {
        console.log("stopped")
        pb.innerHTML = "Audio Ended"
        $('#play-button-1').addClass('btn-secondary').removeClass('btn-info');
        $('#play-button-1').attr("disabled", true);
    };

    audio_2.onended = function () {
        console.log("stopped")
        pb.innerHTML = "Audio Ended"
        $('#play-button-2').addClass('btn-secondary').removeClass('btn-info');
        $('#play-button-2').attr("disabled", true);
    };

    audio_3.onended = function () {
        console.log("stopped")
        pb.innerHTML = "Audio Ended"
        $('#play-button-3').addClass('btn-secondary').removeClass('btn-info');
        $('#play-button-3').attr("disabled", true);
    };

    audio_4.onended = function () {
        console.log("stopped")
        pb.innerHTML = "Audio Ended"
        $('#play-button-4').addClass('btn-secondary').removeClass('btn-info');
        $('#play-button-4').attr("disabled", true);
    };

    audio_5.onended = function () {
        console.log("stopped")
        pb.innerHTML = "Audio Ended"
        $('#play-button-5').addClass('btn-secondary').removeClass('btn-info');
        $('#play-button-5').attr("disabled", true);
    };


    //Audio Skills Exam

    //audio question 1
    $("#question_11 :radio").click(function (){
        audio_exam_answers.question_11 = $('input[name="question_11"]:checked').val()
    })

    $('#nextButton_1').click(function() {
        if (audio_exam_answers.question_11 === "") {
            console.log("You forgot to select an answer")
            $("#incomplete_answer_warning_1").text("PLease select an answer").fadeTo(3000, 300).hide(100, function(){
                    $("#incomplete_answer_warning_1").hide(100);
            })
        }else{
            $('#pill_question1').removeClass('active bg-success').addClass('disabled');
            $('#pill_question2').removeClass('disabled').addClass('active bg-success');
            audio_1.pause();
            $('#question_11').hide();
            $('#question_12').show();
        }
    });

    //audio question 2
    $("#question_12 :radio").click(function (){
        audio_exam_answers.question_12 = $('input[name="question_12"]:checked').val()
    })

    $('#nextButton_2').click(function() {
        if (audio_exam_answers.question_12 === "") {
            console.log("You forgot to select an answer")
            $("#incomplete_answer_warning_2").text("PLease select an answer").fadeTo(3000, 300).hide(100, function(){
                    $("#incomplete_answer_warning_2").hide(100);
            })
        }else{
            $('#pill_question2').removeClass('active bg-success').addClass('disabled');
            $('#pill_question3').removeClass('disabled').addClass('active bg-success');
            audio_1.pause();
            $('#question_12').hide();
            $('#question_13').show();
        }
    });


    //audio question 3
    $("#question_13 :radio").click(function (){
        audio_exam_answers.question_13 = $('input[name="question_13"]:checked').val()
    })

    $('#nextButton_3').click(function() {
        if (audio_exam_answers.question_13 === "") {
            console.log("You forgot to select an answer")
            $("#incomplete_answer_warning_3").text("PLease select an answer").fadeTo(3000, 300).hide(100, function(){
                    $("#incomplete_answer_warning_3").hide(100);
            })
        }else{
            $('#pill_question3').removeClass('active bg-success').addClass('disabled');
            $('#pill_question4').removeClass('disabled').addClass('active bg-success');
            audio_1.pause();
            $('#question_13').hide();
            $('#question_14').show();
        }
    });


    //audio question 4
    $("#question_14 :radio").click(function (){
        audio_exam_answers.question_14 = $('input[name="question_14"]:checked').val()
    })

    $('#nextButton_4').click(function() {
        if (audio_exam_answers.question_14 === "") {
            console.log("You forgot to select an answer")
            $("#incomplete_answer_warning_4").text("PLease select an answer").fadeTo(3000, 300).hide(100, function(){
                    $("#incomplete_answer_warning_4").hide(100);
            })
        }else{
            $('#pill_question4').removeClass('active bg-success').addClass('disabled');
            $('#pill_question5').removeClass('disabled').addClass('active bg-success');
            audio_1.pause();
            $('#question_14').hide();
            $('#question_15').show();
        }
    });


    //submit audio answers
    $("#question_15 :radio").click(function (){
        audio_exam_answers.question_15 = $('input[name="question_15"]:checked').val()
    })

    $('#audioSubmit').click(function() {
        if (audio_exam_answers.question_15 === "") {
            console.log("You forgot to select an answer")
            $("#incomplete_answer_warning_5").text("Please select an answer").fadeTo(3000, 300).hide(100, function(){
                    $("#incomplete_answer_warning_5").hide(100);
            })
        }else{
            $("#audioExam :radio:checked").each(function() {
                if($(this).attr("name").length > 0) {
                    audio_exam_answers[$(this).attr("name")] = $(this).val();
                }
            });

            

            sessionStorage.setItem('audio_answers', JSON.stringify(audio_exam_answers))

            var answer_1 = JSON.parse(sessionStorage.getItem('answers'));
            var answer_2 = JSON.parse(sessionStorage.getItem('audio_answers'));
            var applicant_id = sessionStorage.getItem('test_id');
            var all_answers = Object.assign(answer_1, answer_2)

            var Results = testResult(all_answers);

            var test_result = {
                audio_exam_score: Results[1][0],
                audio_exam_result: Results[1][1],
                critical_exam_score: Results[0][0],
                audio_exam_result: Results[0][1],
                date_taken: sessionStorage.getItem('date_taken'),
                completion_status: true,
                answers: all_answers
            }
            

            
            var database = firebase.database();
            var rootRef = database.ref("Records");
            
            $(this).attr("disabled", true).text("Submitting...")
            rootRef.child(applicant_id).update(test_result)
                    .then(function() {
                        console.log("Successfully Update");
                        sessionStorage.clear();
                         $('#completedDialogModal').modal('toggle');
                    }).catch(function(e){
                        console.error(e)
            })
           
        }

    });

    $('#finishButton').click(function(e) {
        e.preventDefault();
        window.location.replace('./index.html');
    });
    
    
});





//End of document Ready

function countdown(seconds) {

    seconds = parseInt(sessionStorage.getItem("seconds"))||seconds;

    function tick() {
        seconds--; 
        sessionStorage.setItem("seconds", seconds)
        var counter = document.getElementById("timer");
        var current_minutes = parseInt(seconds/60);
        var current_seconds = seconds % 60;
        counter.innerHTML = current_minutes + ":" + (current_seconds < 10 ? "0" : "") + current_seconds;
        
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        }else{
            critical_exam_completed = true
            autoSubmitAnswers();
        }

    }
    tick();
        
}

function autoSubmitAnswers() {

    $("#criticalExam :text").each(function() {
        if($(this).attr("name").length > 0) {
            critical_exam_answers[$(this).attr("name")] = $(this).val();
        }
    });

    $("#criticalExam :radio:checked").each(function() {
        if($(this).attr("name").length > 0) {
            critical_exam_answers[$(this).attr("name")] = $(this).val();
        }
    });

    sessionStorage.setItem('answers', JSON.stringify(critical_exam_answers))
    hideWrittenTest_showAudioTest();
}

function hideWrittenTest_showAudioTest() {
    sessionStorage.setItem('written_test_completed', true)
    $('#criticalExam').hide();
    $('#audioExam').show();
};


function testResult(answer) {
    var ans = Object.entries(answer)
    var correctAnswers = ["0.2","BEEF", "65", "SALLY", "25", "125", "AIR", "14", "", "3.8", "56", "A", "A", "B", "A", "D"]
    
    var writtenTestScore = 0;
    var writtentTestResult = "";
    var audioTestScore = 0;
    var audioTestResult = "";

    var writtenPassingScore = 7;
    var audioPassingScore = 5;

    for(i = 0; i < 16; i++){
        if (i < 11) {
            if(ans[i][1].toUpperCase() === correctAnswers[i] && i !== 8){
                writtenTestScore += 1;
            }
        }else if(i > 10){
            if(ans[i][1].toUpperCase() === correctAnswers[i]){
                audioTestScore += 1;
            }
        }
    }

    if(writtenTestScore >= writtenPassingScore){
        writtentTestResult = "PASSED"
    }else{
        writtentTestResult = "FAILED"
    }

    if(audioTestScore === audioPassingScore){
        audioTestResult = "PASSED"
    }else{
        audioTestResult = "FAILED"
    }

    return [[writtenTestScore, writtentTestResult], [audioTestScore, audioTestResult]];

}




