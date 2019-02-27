/*
Link da referencia: https://codepen.io/ccrch/pen/GgPLVW
*/

function onYouTubePlayerAPIReady(){
	tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
	tv.loadVideoById(vid[currVid]);
	tv.mute();
}


function onPlayerStateChange(e) {
	if (e.data === YT.PlayerState.ENDED) {
        tv.playVideo(); 
    }

	if (e.data === 1){
		$('#tv').addClass('active');
	} 

	else if (e.data === 2){
		$('#tv').removeClass('active');
		if(currVid === vid.length - 1){
			currVid = 0;
		}
		else {
			currVid++;  
		}
		tv.loadVideoById(vid[currVid]);
		tv.seekTo(vid[currVid].startSeconds);
	}
}

function vidRescale(){

	var w = $(window).width()+200, h = $(window).height()+200;

	if (w/h > 16/9){
		tv.setSize(w, w/16*9);
		$('.tv .screen').css({'left': '0px'});
	} else {
		tv.setSize(h/9*16, h);
		$('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
	}
}

$(window).on('load resize', function(){
	vidRescale();
});