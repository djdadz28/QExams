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


firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.replace('/')
        }
            
})

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
    loadFinalResult()

});


function loadUnusedIdTable() {
    var rootRef = database.ref().child("Records");
    var query = rootRef.orderByChild("test_start_confirmation").equalTo(false)
    query.on('child_added', function (snap){
    
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


function loadFinalResult() {
    var rootRef = database.ref().child("Records");
    var query = rootRef.orderByChild("test_start_confirmation").equalTo(true)
    query.on('child_added', function (snap){
    
        var test_id = snap.child("id").val();
        var first_name = snap.child("first_name").val();
        var last_name = snap.child("last_name").val();
        var email = snap.child("email").val();
        var date_taken = snap.child("date_taken").val();

        var critical_exam_score = snap.child("critical_exam_score").val();
        var audio_exam_score = snap.child("audio_exam_score").val();

        var applicant = "<tr id=\"" +snap.key + "\" ><td>"+test_id + "</td><td>" + 
                                first_name +"</td><td>" + 
                                last_name + "</td><td>" + 
                                email + "</td><td>" +
                                date_taken + "</td><td>" +
                                critical_exam_score + "</td><td>" + 
                                audio_exam_score + "</td><td class=\"text-right\"><button id=\"" +snap.key + "\" class=\"btn btn-light btn-sm\" onclick=\"printResult(this)\"><span class=\"fa fa-print\"></span></button><button id=\"" +snap.key + "\" class=\"btn btn-success btn-sm\" onclick=\"reactivateID(this)\"><span class=\"fa fa-key\"></span></button></td></tr>"

        $('#scoreResults').append(applicant);
        
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

function reactivateID(user){
    var updateRef = database.ref("Records");
    updateRef.child(user.id).update({test_start_confirmation: false}).then(function() {
        user.parentNode.parentNode.remove()
        console.log("Reactivated Successfully")
    }).catch(function(e){
        console.error(e)
    })
}

function printResult(user){
    var rootRef = database.ref("Records/" + user.id)
        rootRef.once('value').then(function(snap) {

        sessionStorage.setItem('test_id', snap.child("first_name").val())
        sessionStorage.setItem('first_name', snap.child("first_name").val())
        sessionStorage.setItem('last_name', snap.child("last_name").val())
        sessionStorage.setItem('date_taken', snap.child("date_taken").val())
        sessionStorage.setItem('answers', JSON.stringify(snap.child("answers").val()))


        sessionStorage.setItem('critical_exam_score', snap.child("critical_exam_score").val())
        sessionStorage.setItem('critical_exam_result', snap.child("critical_exam_result").val())
        sessionStorage.setItem('audio_exam_score', snap.child("audio_exam_score").val())
        sessionStorage.setItem('audio_exam_result', snap.child("audio_exam_result").val())

        myPopup('','Print Result')

        }).catch(function(e){
            console.log(e)
        });
    
    
}



function myPopup(url, windowname, w, h, x, y)
{
    window.open(url, windowname, "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, width=" + w + ", height=" + h + ", left=" + x + ", top=" + y);
}