
var test_id = document.getElementById('test_id');

var database = firebase.database();


$('document').ready(function() {


    $('#incomplete_answer_warning').hide();
    $('#invalid_id_warning').hide();

    //test ID Verification
    $('#start_test').on('submit', function (e) {
        e.preventDefault()

            var rootRef = database.ref("Records/" + test_id.value.toUpperCase())
            var updateRef = database.ref("Records");
            rootRef.once('value').then(function(snap) {

                var checkID = snap.exists();
                
                if(checkID){
                    var checkIfUsed = snap.child("test_start_confirmation").val()
                    if (!checkIfUsed){
                        $('#startConfirmationModal').modal('toggle');
                        $('#applicant_name').text(snap.child("first_name").val() +" "+snap.child("last_name").val())
                        
                        $('#confirmStartButton').click(function() {
                                updateRef.child(test_id.value.toUpperCase()).update({test_start_confirmation: true}).then(function() {
                                sessionStorage.setItem('test_id', test_id.value);
                                sessionStorage.setItem('written_test_completed', false);                           
                                sessionStorage.setItem('date_taken', moment().format('l'))
                                $('#startConfirmationModal').modal('toggle');
                                $('body').hide()
                                
                                popupWindow('./exams.html');
                            }).catch(function(e){
                                console.error(e)
                            })
                        });

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


    

        


});


function popupWindow(url)
{
   window.open(url,"MyWindow","toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, width=900, height=700");
}


