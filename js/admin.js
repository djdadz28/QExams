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
        audio_exam_result: "",
        ept_start_confirmation: false
};

var databaseSpawned = false;

var userList = ["PnWOebaXwDOxsqtIqmkLXhnBO1t1","Sul0hErTM7cqB1C1i5zdsMOqhhG2","Y11uK8WYUeO0FUPaglS6nQlVjoy1"]
var superAdmin = false;


firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location.replace('./index.html')
    }else if(user){
        for(var i = 0; i < userList.length; i++){
            if (user.uid === userList[i]) {
                superAdmin = true;
                break;
            }
        }
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
    // loadFinalResult()

});




$('#spawnDateButton').on('submit', function(e){
        e.preventDefault();
        $('#scoreResults').html('');
        var getStartDate = $('#startDate').val()
        var getEndDate = $('#endDate').val()
        loadFinalResult(getStartDate, getEndDate)
    })



function loadFinalResult(startDate, endDate) {

    var myStartDate = moment.tz(startDate, "Asia/Hong_Kong").startOf('day').format()
    var myEndDate = moment.tz(endDate, "Asia/Hong_Kong").endOf('day').format()

    var rootRef = database.ref().child("Records");
    var query = rootRef.orderByChild("date_taken").startAt(myStartDate);
    query.on('child_added', function (snap){            
        var date_taken = snap.child("date_taken").val();
        var ept_start_confirmation = snap.child("ept_start_confirmation").val();
        if(date_taken <= myEndDate && ept_start_confirmation){
            var test_id = snap.child("id").val();
            var first_name = snap.child("first_name").val();
            var last_name = snap.child("last_name").val();
            var ept_score = snap.child("ept_score").val();
            
            var typeScore = JSON.parse(snap.child("typing_score").val())
            var typing_score = typeScore[0] === "In Progress" ? "In Progress" : typeScore[0] + " wpm / " + typeScore[1] + "%"; //To edit soon
            var critical_exam_score = snap.child("critical_exam_score").val();
            var audio_exam_score = snap.child("audio_exam_score").val();
            var forSKT = snap.child("forSKT").val();
            var applicant = "<tr id=\"" +snap.key + "\" ><td>"+test_id + "</td><td>" + 
                                    first_name +"</td><td>" + 
                                    last_name + "</td><td>" + 
                                    moment(date_taken).format('l') + "</td><td>" +
                                    typing_score + "</td><td>" +
                                    ept_score + "</td><td>" +
                                    critical_exam_score + "</td><td>" + 
                                    audio_exam_score + "</td><td class=\"text-right\"><button id=\"" +snap.key + "\" class=\"btn " + (forSKT ? "btn-success": "btn-danger") + " btn-sm\" onclick=\"activateSKT(this)\">SKT<span class=\"fa fa-check\"></span></button>&nbsp;<button id=\"" +snap.key + "\" class=\"btn btn-info btn-sm\" onclick=\"reactivateInitial(this)\"><span class=\"fa fa-key\"></span>1</button>&nbsp;<button id=\"" +snap.key + "\" class=\"btn btn-info btn-sm\" onclick=\"reactivateSKT(this)\"><span class=\"fa fa-key\"></span>2</button>&nbsp;<button id=\"" +snap.key + "\" class=\"btn btn-light btn-sm\" onclick=\"printResult(this)\"><span class=\"fa fa-print\"></span></button>&nbsp;<button id=\"" +snap.key + "\" class=\"btn btn-secondary btn-sm\" onclick=\"updateData(this)\"><span class=\"fa fa-pencil-square-o\"></span></button></td></tr>"

            $('#scoreResults').append(applicant);
        }
    });
};


function loadUnusedIdTable() {
 
    var rootRef = database.ref().child("Records");
    var query = rootRef.orderByChild("ept_start_confirmation").equalTo(false)
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





function updateData(user){

    $('#updateDataModal').modal('toggle');

    var userData = {
        test_id: "",
        firstName: "",
        lastName: "",
        typingScore: [],
        typingSpeed: "",
        typingAccuracy: "",
        eptScore: "",
        writtenTest: "",
        audioTest: ""
    }
    
    var updateRef = database.ref("Records");
    var queryRef = database.ref("Records/" + user.id);
    queryRef.once('value', function(snap){
        userData.firstName = snap.child('first_name').val()
        userData.lastName = snap.child('last_name').val()
        userData.typingScore = JSON.parse(snap.child('typing_score').val()) || [0,0]
        userData.typingSpeed = userData.typingScore[0] || null;
        userData.typingAccuracy = userData.typingScore[1] || null;
        userData.eptScore = snap.child('ept_score').val()
        userData.writtenTest = snap.child('critical_exam_score').val()
        userData.audioTest = snap.child('audio_exam_score').val();

        $('#updateFirstName').attr('value', userData.firstName)
        $('#updateLastName').attr('value', userData.lastName)
        if (superAdmin) {
            $('#updateTypingSpeed').attr('value', userData.typingSpeed)
            $('#updateTypingAccuracy').attr('value', userData.typingAccuracy)
            $('#updateEptScore').attr('value', userData.eptScore)
            $('#updateCriticalExam').attr('value', userData.writtenTest)
            $('#updateAudioExam').attr('value', userData.audioTest)
        }else{
            $('#updateTypingSpeed').attr({value: userData.typingSpeed, disabled: true})
            $('#updateTypingAccuracy').attr({value: userData.typingAccuracy, disabled: true } )
            $('#updateEptScore').attr({value: userData.eptScore, disabled: true})
            $('#updateCriticalExam').attr({value: userData.writtenTest, disabled: true})
            $('#updateAudioExam').attr({value: userData.audioTest, disabled: true})
        }
        

        $('#updateFirstName').change(function(){
            userData.firstName = $(this).val()
            console.log(userData.firstName)
        })
        $('#updateLastName').change(function(){
            userData.lastName = $(this).val()
        })
        $('#updateTypingSpeed').change(function(){
            userData.typingSpeed = parseInt($(this).val())
        })
        $('#updateTypingAccuracy').change(function(){
            userData.typingAccuracy = parseInt($(this).val())
        })
        $('#updateEptScore').change(function(){
            userData.eptScore = parseInt($(this).val())
        })
        $('#updateCriticalExam').change(function(){
            userData.writtenTest = parseInt($(this).val())
        })
        $('#updateAudioExam').change(function(){
            userData.audioTest = parseInt($(this).val())
        })


    }).then(function() {
        $('#updateDataSubmit').click(function() {
            updateRef.child(user.id).update(
                {
                    first_name: (userData.firstName).toUpperCase(),
                    last_name: (userData.lastName).toUpperCase(),
                    typing_score: JSON.stringify([userData.typingSpeed,userData.typingAccuracy]),
                    ept_score: userData.eptScore,
                    critical_exam_score: userData.writtenTest,
                    audio_exam_score: userData.audioTest
                }
            ).then(function() {
                $("#updateDataModal").modal('toggle');
                window.location.reload();
                
            }).catch(function(e){
                console.error(e)
            })
        })
    }).catch(function(e){
        console.error(e)
    })

 
}



function activateSKT(user){
    var updateRef = database.ref("Records");
    var checkRef = database.ref("Records/" + user.id);
    var activated;
    checkRef.once('value').then(function(snap) {
        activated = snap.child("forSKT").val()
        if (activated) {
            updateRef.child(user.id).update({forSKT: false}).then(function() {
                $(user).addClass('btn-danger').removeClass('btn-success')
            }).catch(function(e){
                console.error(e)
            })
            }else{
            updateRef.child(user.id).update({forSKT: true}).then(function() {
                $(user).addClass('btn-success').removeClass('btn-danger')
            }).catch(function(e){
                console.error(e)
            })
        }
    })
        
}


function onDelete(user){

    var ref = database.ref('Records/' + user.id);
    ref.remove().then(function() {
            user.parentNode.parentNode.remove()
            console.log('Successfully deleted');
        }).catch(function(err){
            console.error(err);
        });
    
}

function reactivateSKT(user){
    var updateRef = database.ref("Records");
    updateRef.child(user.id).update({test_start_confirmation: false}).then(function() {
        // user.parentNode.parentNode.remove()
        alert("Successfully Unlocked SKT Exam")
    }).catch(function(e){
        console.error(e)
    })
}

function reactivateInitial(user){
    var updateRef = database.ref("Records");
    updateRef.child(user.id).update({ept_start_confirmation: false}).then(function() {
        // user.parentNode.parentNode.remove()
        alert("Successfully Unlocked Initial Exam")
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
        sessionStorage.setItem('ept_score', snap.child("ept_score").val())
        sessionStorage.setItem('typing_score', snap.child("typing_score").val())

        myPopup('./printResult.html','Print Result')

        }).catch(function(e){
            console.log(e)
        });
    
    
}



function myPopup(url, windowname, w, h, x, y)
{
    window.open(url, windowname, "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, width=" + w + ", height=" + h + ", left=" + x + ", top=" + y);
}