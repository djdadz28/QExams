var print = {
        id: sessionStorage.getItem('test_id'),
        first_name: sessionStorage.getItem('first_name'),
        last_name: sessionStorage.getItem('last_name'),
        date_taken: sessionStorage.getItem('date_taken'),
        answers: JSON.parse(sessionStorage.getItem('answers')),
        critical_exam_score: sessionStorage.getItem('critical_exam_score'),
        critical_exam_result: sessionStorage.getItem('critical_exam_result'),
        audio_exam_score: sessionStorage.getItem('audio_exam_score'),
        audio_exam_result: sessionStorage.getItem('audio_exam_result'),
        ept_score: sessionStorage.getItem('ept_score'),
        typing_score: JSON.parse(sessionStorage.getItem('typing_score'))
};


$('#titlename').text(print.first_name + " " + print.last_name)
$('#ans_1').text("Answer: $" + print.answers.question_1)
$('#ans_2').text("Answer: " + print.answers.question_2)
$('#ans_3').text("Answer: " + print.answers.question_3 + " mph")
$('#ans_4').text("Answer: " + print.answers.question_4)
$('#ans_5').text("Answer: " + print.answers.question_5)
$('#ans_6').text("Answer: " + print.answers.question_6)
$('#ans_7').text("Answer: " + print.answers.question_7)
$('#ans_8').text("Answer: " + print.answers.question_8 + ", " + print.answers.question_8_2)
$('#ans_9').text("Answer: " + print.answers.question_9)
$('#ans_10').text("Answer: " + print.answers.question_10)
$('#ans_11').text("Answer: " + print.answers.question_11)
$('#ans_12').text("Answer: " + print.answers.question_12)
$('#ans_13').text("Answer: " + print.answers.question_13)
$('#ans_14').text("Answer: " + print.answers.question_14)
$('#ans_15').text("Answer: " + print.answers.question_15)
$('#initialTest').text(print.typing_score[0] + "(" + print.typing_score[1] + "%) and " + print.ept_score )
$('#audio_result').text(print.audio_exam_score + "/5")
$('#written_result').text(print.critical_exam_score + "/10")
$('#date_taken').text("Test Date: " + moment(print.date_taken).format('l'))

