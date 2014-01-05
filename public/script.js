var socket = io.connect();
var player = videojs('example_video_1');

player.ready(function(){
    this.play();
});

function addMessage(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}
function sentMessage() {
	if ($('#messageInput').val() != "")
	{
		socket.emit('message', $('#messageInput').val());
		addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
		$('#messageInput').val('');
	}
}
function setPseudo() {
	if ($("#pseudoInput").val() != "")
	{
		socket.emit('setPseudo', $("#pseudoInput").val());
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}
socket.on('message', function(data) {
	addMessage(data['message'], data['pseudo']);
});

socket.on('rewind', function(setTime){
    setCurrentTime(setTime);
});

function setCurrentTime(setTime){
    player.currentTime(setTime);
    console.log("lalala");
}

function rewind(seconds) {
    seconds = typeof seconds !== 'undefined' ? seconds : 5;
    var setTime = player.currentTime() - seconds;

    socket.emit('rewind', setTime);
    setCurrentTime(setTime);
}



$(function(){
    $("#moveBack5").on("click", rewind);
});