var socket = io.connect();

function rewind() {
    //seconds = typeof seconds !== 'undefined' ? seconds : 5;
    //var setTime = seconds;

    socket.emit('rewind', 5);
}

$(function(){
    $("#moveBack5").on("click", rewind);
});
