const testID = document.getElementById('test_id')



$('#test_id').focusout(function(){
    $('#applicant_name').text(testID.value)
})


//TO DO Database Validation
$('#start_test').on('submit', function (e) {
    e.preventDefault()
    if (testID.value !== "") {
        window.location.replace('criticalExamSKT.html')
    }else{
        alert('Please Enter a Test ID')
    }
})


$('#submit_answers').click(function() {
    window.location.replace('audioExam.html')
})