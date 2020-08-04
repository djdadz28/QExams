var critical_exam_completed = false;

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

$('document').ready(function() {

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
                window.location.replace('./audioExam.html')
            }
    
    });

})




