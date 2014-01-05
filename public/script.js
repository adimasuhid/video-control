var socket = io.connect();
var player = videojs('example_video_1');
var fullscreen = false;

socket.on('message', function(data) {
	addMessage(data['message'], data['pseudo']);
});

socket.on('rewind', function(){
    setCurrentTime(player.currentTime() - 5);
});

socket.on('pause', function(){
    player.pause();
});

socket.on('play', function(){
    player.play();
});

socket.on('reset', function(){
    setCurrentTime(0);
    player.pause();
});

socket.on('fullscreen', function(){
    toggleFullScreen();
});

function toggleFullScreen(){
    if (fullscreen){
        player.cancelFullScreen()
        fullscreen = false;
        console.log(fullscreen);
    } else {
        player.requestFullScreen();
        fullscreen = true;
        console.log(fullscreen);
    }
}

function setCurrentTime(setTime){
    player.currentTime(setTime);
}

function rewind(seconds) {
    seconds = typeof seconds !== 'undefined' ? seconds : 5;
    var setTime = player.currentTime() - seconds;

    socket.emit('rewind', setTime);
    setCurrentTime(setTime);
}

function toggleControlBarDisplay(){
    if (fullscreen) {
        $(".vjs-control-bar").css("display", "none");
    } else {
        $(".vjs-control-bar").css("display", "block");
    }
}

$(function(){
    player.on("fullscreenchange", function(){
        fullscreen = !fullscreen;
        toggleControlBarDisplay();
    });
});