var socket = io.connect();

function rewind() {
    //seconds = typeof seconds !== 'undefined' ? seconds : 5;
    //var setTime = seconds;

    socket.emit('rewind');
}

function pause() {
    socket.emit('pause');
}

function play() {
    socket.emit('play');
}

function reset() {
    socket.emit('reset');
}

function toggleFullScreen(){
    socket.emit('fullscreen');
}

$(function(){
    $("#moveBack5").on("click", rewind);
    $("#pause").on("click", pause);
    $("#play").on("click", play);
    $("#reset").on("click", reset);
    $("#toggle-fullscreen").on("click", toggleFullScreen);
});
