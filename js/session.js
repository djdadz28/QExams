
document.cookie = 'SameSite=Lax';


var test_id = document.getElementById('test_id');

$('document').ready(function() {

    $('#incomplete_answer_warning').hide();

    //test ID Verification
    $('#start_test').on('submit', function (e) {
        e.preventDefault()
        if ($('test_id').val() !== "") {
                sessionStorage.setItem('test_id', test_id.value)
                window.location.replace('criticalExamSKT.html')

        }else{
            alert('Please Your Test ID')
        }

    });



});




