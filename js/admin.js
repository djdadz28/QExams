var database = firebase.database();

var user = {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        completion_status: false,
        test_start_confirmation: false,
        date_taken: "",
        time_started: "",
        time_ended: "",
        answers: "",
        critical_exam_score: "",
        critical_exam_result: "",
        audio_exam_score: "",
        audio_exam_result: ""
};

$('document').ready(function() {

    //Create Test ID
    $('#create_form').on('submit', function(e) {
        e.preventDefault();

        user.id = $('#test_id').val().toUpperCase();
        user.first_name = $('#first_name').val().toUpperCase();
        user.last_name = $('#last_name').val().toUpperCase();
        user.email = $('#email').val().toUpperCase();    

        var reg_form = document.querySelector('#create_form');
        var ref = database.ref('Records');

        ref.child(user.id).set(user)
            .then(function(value) {
                console.log('Successfully Registered');
                reg_form.reset();
                user.id = "";
                user.first_name = "";
                user.last_name = "";
                user.email = "";
            })
            .catch(function(err){
                console.error(err);
            });
    });

    //Update Test ID
    $('#updateButton').click(function() {
        user.id = $('#test_id').val().toUpperCase();
        user.first_name = $('#first_name').val().toUpperCase();
        user.last_name = $('#last_name').val().toUpperCase();
        user.email = $('#email').val().toUpperCase();

        var ref = database.ref('Records');

        ref.child(user.id).update({
            'first_name': user.first_name,
            'last_name': user.first_name,
            'email': user.email
        }).then(function(){
            console.log("Successfully Updated");
        }).catch(function(err){
            console.log(err);
        });
    });
 
    loadUnusedIdTable();

});


function loadUnusedIdTable() {
    var rootRef = database.ref().child("Records");
    
    rootRef.on('child_added', function (snap){
    

        var test_id = snap.child("id").val();
        var first_name = snap.child("first_name").val();
        var last_name = snap.child("last_name").val();
        var email = snap.child("email").val();
        var applicant = "<tr><td>"+test_id + "</td><td>" + 
                                first_name +"</td><td>" + 
                                last_name + "</td><td>" + 
                                email + "</td><td class=\"text-right\"><button id=\"" +snap.key + "\" class=\"btn btn-light btn-sm\" onclick=\"onDelete(this)\"><span class=\"fa fa-close\"></span></button></td></tr>";

        $('#unusedIdContent').append(applicant);
        
    });
};

function onDelete(user){

    var ref = database.ref('Records/' + user.id);
    ref.remove().then(function() {
            user.parentNode.parentNode.remove()
            console.log('Successfully deleted');
        }).catch(function(err){
            console.error(err);
        });
    
}