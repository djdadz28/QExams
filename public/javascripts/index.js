$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyA8fq7AApZPMghtzK6TSGfCGQ5CZzOHGhQ",
        authDomain: "q-exams.firebaseapp.com",
        databaseURL: "https://q-exams.firebaseio.com",
        projectId: "q-exams",
        storageBucket: "q-exams.appspot.com",
        messagingSenderId: "498052030565",
        appId: "1:498052030565:web:33a57e78802406531ae68c",
        measurementId: "G-MS3W98G8BP"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var auth = firebase.auth();

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        if( $('#userEmail').val() != '' && $('#userPassword').val() != '' ){
        //login the user
            var data = {
                email: $('#userEmail').val(),
                password: $('#userPassword').val()
            };
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                    .then(function(authData) {
                        var auth = authData;
                    window.location.replace("/admins");
                    })
            .catch(function(error) {
                console.log("Login Failed!", error);
                alert(error);
            });
        };
    });

    $('#logout').on('click', function(e) {
        e.preventDefault();
        firebase.auth().signOut();
        console.log("logout successfully");
        window.location.replace("/");

    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var auth = user;
            console.log("User is: " + auth)
        } else {
        // No user is signed in.
            var auth = null;
            console.log("No User")
        }
    });

});