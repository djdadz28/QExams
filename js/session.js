
var test_id = document.getElementById('test_id');

var database = firebase.database();


$('document').ready(function() {


    $('#incomplete_answer_warning').hide();
    $('#invalid_id_warning').hide();

    //test ID Verification
    $('#start_test').on('submit', function (e) {
        e.preventDefault()

            var rootRef = database.ref("Records/" + test_id.value.toUpperCase())
            rootRef.once('value').then(function(snap) {

                var checkID = snap.exists();
                
                if(checkID){
                    var checkIfUsed = snap.child("test_start_confirmation").val()
                    if (!checkIfUsed){
                        $('#startConfirmationModal').modal('toggle');
                        $('#applicant_name').text(snap.child("first_name").val() +" "+snap.child("last_name").val())
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
            }).catch(function(e){
                console.log(e)
            });
    });


    $('#confirmStartButton').click(function() {
        sessionStorage.setItem('test_id', test_id.value);
        sessionStorage.setItem('written_test_completed', false);
        sessionStorage.setItem('start_confirmation', true)
        sessionStorage.setItem('date_taken', moment().format('l'))
        window.location.replace('./exams.html');
    });

        


});




