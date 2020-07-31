var a = document.getElementById("myaudio")
var pb = document.getElementById("play-button")
var myaudio = document.getElementById("myaudio")


$("#play-button").click(function() {
    a.play()
    pb.innerHTML = "Playing..."
})

myaudio.onended = function () {
    console.log("stopped")
    pb.innerHTML = "Audio Ended"
    $('#play-button').addClass('btn-secondary').removeClass('btn-info');
    $('#play-button').attr("disabled", true)
    
    
}