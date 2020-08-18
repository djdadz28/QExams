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

moment.tz.add(["Asia/Manila|PST PDT JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6",
"Asia/Hong_Kong|LMT HKT HKST HKWT JST|-7A.G -80 -90 -8u -90|0123412121212121212121212121212121212121212121212121212121212121212121|-2CFH0 1taO0 Hc0 xUu 9tBu 11z0 1tDu Rc0 1wo0 11A0 1cM0 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5","America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6"]);


$(document).ready(function() {

    if (history.pushState != undefined) {
        history.pushState(null, null, location.href);
    }
    history.back();
    history.forward();
    window.onpopstate = function () {
        history.go(1);
    };


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
                        $("#loginWarning").text("Incorrect Login Credentials").fadeTo(3000, 300).hide(100, function(){
                            $("#loginWarning").hide(100);
                        })
                    });
        };
    });

    $('#logout').on('click', function(e) {
        e.preventDefault();
        sessionStorage.clear();
        firebase.auth().signOut();
        console.log("logout successfully");
        window.location.replace("./index.html");

    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var auth = user;
            // console.log("User is: " + JSON.stringify(auth))
            // console.log("Admin Successfully Logged in")
        } else {
            var auth = null;
            // console.log("No User")

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

// $(window).blur(function() {
//     $("body").hide();
// });
// $(window).focus(function() {
//     $("body").show();
// });