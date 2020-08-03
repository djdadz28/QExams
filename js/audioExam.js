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


    //Next Function

    $('#nextButton_1').click(function() {
        $('#pill_question1').removeClass('active bg-success').addClass('disabled');
        $('#pill_question2').removeClass('disabled').addClass('active bg-success');
        audio_1.pause();
        $('#question_1').hide();
        $('#question_2').show();
    });

    $('#nextButton_2').click(function() {
        $('#pill_question2').removeClass('active bg-success').addClass('disabled');
        $('#pill_question3').removeClass('disabled').addClass('active bg-success');
        audio_2.pause();
        $('#question_2').hide();
        $('#question_3').show();
    });

    $('#nextButton_3').click(function() {
        $('#pill_question3').removeClass('active bg-success').addClass('disabled');
        $('#pill_question4').removeClass('disabled').addClass('active bg-success');
        audio_3.pause();
        $('#question_3').hide();
        $('#question_4').show();
    });

    $('#nextButton_4').click(function() {
        $('#pill_question4').removeClass('active bg-success').addClass('disabled');
        $('#pill_question5').removeClass('disabled').addClass('active bg-success');
        audio_4.pause();
        $('#question_4').hide();
        $('#question_5').show();
    });
    $('#audioSubmit').click(function() {
        console.log('clicked')
        $('#completedDialogModal').modal('toggle');
    });

    $('#finishButton').click(function(e) {
        e.preventDefault();
        window.location.replace('index.html');
    });

});

