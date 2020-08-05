
var test_id = document.getElementById('test_id');


$('document').ready(function() {

    $('#incomplete_answer_warning').hide();

    //test ID Verification
    $('#start_test').on('submit', function (e) {
        e.preventDefault()
            if (test_id.value !== "") {
                $('#startConfirmationModal').modal('toggle');
            }else{
                alert('Please Your Test ID');
            }

    });

    $('#confirmStartButton').click(function() {
        sessionStorage.setItem('test_id', test_id.value);
        window.location.replace('./criticalExamSKT.html');
    });

        


});




