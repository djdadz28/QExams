
var grammarOne = "";
var grammarTwo = "";
var vocabulary = "";
var readingComprehension = "";


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





var test_id = document.getElementById('test_id');
var database = firebase.database();

$(document).ready(function() {


    if (history.pushState != undefined) {
            history.pushState(null, null, location.href);
        }
        history.back();
        history.forward();
        window.onpopstate = function () {
            history.go(1);
        };

    $('#startTestForm').on('submit', function(e){
        e.preventDefault()

        var rootRef = database.ref("Records/" + test_id.value.toUpperCase())
        var updateRef = database.ref("Records");
        rootRef.once('value').then(function(snap) {

            var checkID = snap.exists();
            
            if(checkID){
                var checkIfUsed = snap.child("ept_start_confirmation").val()
                if (!checkIfUsed){
                    $('#eptStartConfirmationModal').modal('toggle');
                    $('#applicant_name').text(snap.child("first_name").val() +" "+snap.child("last_name").val())

                    $("#eptConfirmStartButton").click(function() {

                        var date_taken = moment.utc().tz("Asia/Manila").format();

                        updateRef.child(test_id.value.toUpperCase()).update({ept_start_confirmation: true, typing_score: JSON.stringify(['In Progress', 'In Progress']), date_taken: date_taken, typing_start_time: date_taken}).then(function() {
                            $('#eptStartConfirmationModal').modal('toggle');
                            $('body').hide()
                            sessionStorage.setItem('page', 1);
                            sessionStorage.setItem('test_id', (test_id.value).toUpperCase());
                            popupWindow('./typingtest.html')
                        }).catch(function(e){
                            console.error(e)
                        })
                    })
                }else{
                    $("#invalid_id_warning").text("Test ID is not available").fadeTo(3000, 300).hide(100, function(){
                        $("#invalid_id_warning").hide(100);
                    })
                }
            }else{
                $("#invalid_id_warning").text("Test ID is Not Available").fadeTo(3000, 300).hide(100, function(){
                    $("#invalid_id_warning").hide(100);
                })
            }
        });
    })

    $('#next_section').click(function (){
        // page += 1
        sessionStorage.setItem('page', JSON.parse(sessionStorage.getItem('page')) + 1)
        pageHandler(JSON.parse(sessionStorage.getItem('page')));
    })

    $('#prev_section').click(function (){
        // page -= 1
        sessionStorage.setItem('page', JSON.parse(sessionStorage.getItem('page')) - 1)
        pageHandler(JSON.parse(sessionStorage.getItem('page')));
    })

    $('#submit_ept_answers').on('click', function(e){
        e.preventDefault()

        var answerHolder = createObject(50)
        var noAnswerCount = 0;
        var noAnswer = ""
        var applicant_id = sessionStorage.getItem('test_id');

        $("#content_holder :radio:checked").each(function() {
            if($(this).attr("name").length > 0) {
                answerHolder[$(this).attr("name")] = $(this).val();
            }
        });

        for(ans in answerHolder){
            if (answerHolder[ans] === "" || answerHolder[ans] === null) {
                noAnswer += "<p>Question: " + ans + "</p>"
                noAnswerCount += 1
            }
        }

        if (noAnswerCount > 0) {
            $("#skipped_questions").html(noAnswer)
            $("#skippedQuestionsModal").modal('toggle')
        }else{
            var ept_score = (checkAnswers(answerHolder, correctAnswers) * 2)
            var ept_end_time = moment.utc().tz("Asia/Manila").format();
            var rootRef = database.ref("Records");
            
            $(this).attr("disabled", true).text("Submitting...")
            rootRef.child(applicant_id).update({'ept_score': ept_score, 'ept_end_time': ept_end_time})
                    .then(function() {
                        console.log("Successfully Update");
                        sessionStorage.clear();
                        $("#completedDialogModal").modal('toggle')
                    }).catch(function(e){
                        $(this).attr("disabled", false).text("Submit Again")
                        console.error(e)
            })
        }
    })
    
    $("#finishButton").click(function() {
        window.opener.location.reload();
        window.close();
    })


    displayAllDivs();
    pageHandler(JSON.parse(sessionStorage.getItem('page')));



    document.addEventListener("keyup", function (e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
            if (keyCode == 44) {
                stopPrntScr();
            }
        });



});


function displayQuestions(start, end){

    var html = "";
    
    $.each(ept_questions, function(key, value){

        if (key >= start && key <= end) {
            html += "<div class=\"row row-question\">" + 
            "<div class=\"col-12\">" +
                "<div><label for=\""+ key +"\" class=\"col-form-label font-weight-bold\">" + key + ". " + value.question + "</label></div>" +
                    "<div class=\"col mr-5\">" +
                        "<div class=\"form-check\">" +
                            "<label class=\"form-check-label\">" +
                                "<input type=\"radio\" class=\"form-check-input\" name=\"" + key + "\" value=\"A\">"
                                + value.answers.A
                            + "</label>"
                        + "</div>" +
                        "<div class=\"form-check\">" +
                            "<label class=\"form-check-label\">" +
                                "<input type=\"radio\" class=\"form-check-input\" name=\"" + key + "\" value=\"B\">"
                                + value.answers.B
                            + "</label>"
                        + "</div>" +
                        "<div class=\"form-check\">" +
                            "<label class=\"form-check-label\">" +
                                "<input type=\"radio\" class=\"form-check-input\" name=\"" + key + "\" value=\"C\">"
                                + value.answers.C
                            + "</label>"
                        + "</div>" +
                        "<div class=\"form-check\">" +
                            "<label class=\"form-check-label\">" +
                                "<input type=\"radio\" class=\"form-check-input\" name=\"" + key + "\" value=\"D\">"
                                + value.answers.D
                            + "</label>"
                        + "</div>"
                    + "</div>"
                + "</div>"
            + "</div>";
        }
    })
    return html;
}

function displayAllDivs(){
    $("#div_grammar_1").html(displayQuestions(0, 15))
    $("#div_grammar_2").html(displayQuestions(16, 30))
    $("#div_vocabulary").html(displayQuestions(31, 40))
    $("#div_reading_1").html(displayQuestions(41, 42))
    $("#div_reading_2").html(displayQuestions(43, 44))
    $("#div_reading_3").html(displayQuestions(45, 47))
    $("#div_reading_4").html(displayQuestions(48, 50))
}

function pageHandler(page){
    var currentPage = page
    if (!currentPage) {
        currentPage = 1
    }
    if (currentPage === 1 || !currentPage) {
        $("#div_grammar_1").show().focus()
        $("#div_grammar_2").hide()
        $("#div_vocabulary").hide()
        $("#div_reading_comprehension").hide()
        $("#prev_section").hide()
        $("#next_section").show()
        $("#submit_ept_answers").hide()
        $("#pill_1").addClass("active bg-success").removeClass("disabled")
        $("#pill_2").removeClass("active bg-success")
        $("#pill_3").removeClass("active bg-success")
        $("#pill_4").removeClass("active bg-success")
        $("#instructions").text('Select the best answer')
    }else if(currentPage === 2){
        $("#div_grammar_1").hide()
        $("#div_grammar_2").show().focus()
        $("#div_vocabulary").hide()
        $("#div_reading_comprehension").hide()
        $("#prev_section").show()
        $("#next_section").show()
        $("#submit_ept_answers").hide()
        $("#pill_1").removeClass("active bg-success")
        $("#pill_2").addClass("active bg-success").removeClass("disabled")
        $("#pill_3").removeClass("active bg-success")
        $("#pill_4").removeClass("active bg-success")
        $("#instructions").html('Select the underlined word or phrase that is <i>incorrect</i>.')
    }else if(currentPage === 3){
        $("#div_grammar_1").hide()
        $("#div_grammar_2").hide()
        $("#div_vocabulary").show().focus()
        $("#div_reading_comprehension").hide()
        $("#prev_section").show()
        $("#next_section").show()
        $("#submit_ept_answers").hide()
        $("#pill_1").removeClass("active bg-success")
        $("#pill_2").removeClass("active bg-success")
        $("#pill_3").addClass("active bg-success").removeClass("disabled")
        $("#pill_4").removeClass("active bg-success")
        $("#instructions").text('Select the best answer')
    }else if(currentPage === 4){
        $("#div_grammar_1").hide()
        $("#div_grammar_2").hide()
        $("#div_vocabulary").hide()
        $("#div_reading_comprehension").show().focus()
        $("#next_section").hide()
        $("#prev_section").show()
        $("#submit_ept_answers").show()
        $("#pill_1").removeClass("active bg-success")
        $("#pill_2").removeClass("active bg-success")
        $("#pill_3").removeClass("active bg-success")
        $("#pill_4").addClass("active bg-success").removeClass("disabled")
        $("#instructions").text('Select the best answer')
    }
    scrollTop();
}

function pillNavigator(pill){
    if (pill.id === "pill_1") {
        sessionStorage.setItem('page', 1)
        pageHandler(1)
    }else if(pill.id === "pill_2"){
        sessionStorage.setItem('page', 2)
        pageHandler(2)
    }else if(pill.id === "pill_3"){
        sessionStorage.setItem('page', 3)
        pageHandler(3)
    }else if(pill.id === "pill_4"){
        sessionStorage.setItem('page', 4)
        pageHandler(4)
    }
}

function scrollTop(){
    $('html, body').animate({
        scrollTop: $('body').offset().top
    }, 200);
}

function createObject (limit){
    var obj = {}
    for(var i = 1; i <= limit; i++){
        obj[i] = ""
    }
    return obj
}





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

function popupWindow(url)
{
   window.open(url,"MyWindow","toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, width=900, height=700");
}


function checkAnswers(answers, correctAns){
    var score = 0;
    
    for(var ans in answers){
        if (answers[ans] === correctAns[ans]) {
            score += 1
        }
    }

    return score
}


