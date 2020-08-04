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

$('document').ready(function() {

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
        playButton_1.innerHTML = "Playing..."
    });

    $("#play-button-2").click(function() {
        audio_2.play()
        playButton_2.innerHTML = "Playing..."
    });

    $("#play-button-3").click(function() {
        audio_3.play()
        playButton_3.innerHTML = "Playing..."
    });

    $("#play-button-4").click(function() {
        audio_4.play()
        playButton_4.innerHTML = "Playing..."
    });

    $("#play-button-5").click(function() {
        audio_5.play()
        playButton_5.innerHTML = "Playing..."
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
        }else{
            $("#audioExam :radio:checked").each(function() {
                if($(this).attr("name").length > 0) {
                    audio_exam_answers[$(this).attr("name")] = $(this).val();
                }
            });

            sessionStorage.setItem('audio_answers', JSON.stringify(audio_exam_answers))

            var answer_1 = JSON.parse(sessionStorage.getItem('answers'))
            var answer_2 = JSON.parse(sessionStorage.getItem('audio_answers'))
            var applicant_id = {test_id: sessionStorage.getItem('test_id')}

            all_answers = Object.assign(applicant_id, answer_1, answer_2)
            
            var database = firebase.database();
            var ref = database.ref("Results");

            console.log(all_answers)

            // ref.push(all_answers);

            $('#completedDialogModal').modal('toggle');
        }

    });

    $('#finishButton').click(function(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace('./index.html');
    });

});

