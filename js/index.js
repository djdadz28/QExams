$(document).ready(function(){

    if (history.pushState != undefined) {
        history.pushState(null, null, location.href);
    }
    history.back();
    history.forward();
    window.onpopstate = function () {
        history.go(1);
    };

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
                    window.location.replace("./adminDashboard.html");
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
        window.location.replace("./index.html");

    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var auth = user;
            console.log("User is: " + JSON.stringify(auth))
        } else {
            var auth = null;
            console.log("No User")

            if (window.location.pathname == "/adminDashboard.html") {
                window.location.replace("/");
            }
        }
    });


    document.addEventListener("keyup", function (e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
            if (keyCode == 44) {
                stopPrntScr();
            }
        });

    function stopPrntScr() {

            var inpFld = document.createElement("input");
            inpFld.setAttribute("value", ".");
            inpFld.setAttribute("width", "0");
            inpFld.style.height = "0px";
            inpFld.style.width = "0px";
            inpFld.style.border = "0px";
            document.body.appendChild(inpFld);
            inpFld.select();
            document.execCommand("copy");
            inpFld.remove(inpFld);
        }
    function AccessClipboardData() {
        try {
            window.clipboardData.setData('text', "Access   Restricted");
        } catch (err) {
        }
    }
        setInterval(AccessClipboardData(), 300);

    
        

});

$(window).blur(function() {
    $("body").hide();
});
$(window).focus(function() {
    $("body").show();
});