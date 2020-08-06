
var test_id = document.getElementById('test_id');



$('document').ready(function() {

    $('#incomplete_answer_warning').hide();

    //test ID Verification
    $('#start_test').on('submit', function (e) {
        e.preventDefault()
            if (test_id.value !== "") {
                $('#startConfirmationModal').modal('toggle');
                sessionStorage.setItem('start_confirmation', true)
                sessionStorage.setItem('date_taken', moment().format('l'))
            }else{
                alert('Please Your Test ID');
            }

    });

    $('#confirmStartButton').click(function() {
        sessionStorage.setItem('test_id', test_id.value);
        sessionStorage.setItem('written_test_completed', false);
        window.location.replace('./exams.html');
    });

        


});




