(function () {
	'use strict';

	// hide controls in case of no mouse or touch activity for 10 seconds
	var videoControls = document.getElementById('video-controls');
	var video = document.getElementById('video');
	var player = document.getElementById('player');
	var body = document.getElementsByTagName("BODY")[0];

	var isOnPlayer = false;
	player.addEventListener("mouseenter", function(  ) {
		isOnPlayer=true;
	});

	player.addEventListener("mouseover", function () {
		videoControls.classList.add('display-control');	
	});

	player.addEventListener("mouseout", function () {
		var e = event.toElement || event.relatedTarget;
        if (e && (e.parentNode == this || e == this)) {
           return;
        }
		// isOnPlayer=false;
		hideControls();	
	});

	function hideControls() {
		if (! video.paused) {
			videoControls.classList.remove('display-control');
			if(isOnPlayer) {
				document.body.style.cursor = "none";
				console.log('none triggered');
			}
		}
	}

	var timer = setTimeout(hideControls, 3000);

	document.addEventListener("mousemove", function () {
		console.log(isOnPlayer);
		document.body.style.cursor = "auto";
		console.log('auto triggered');
		if(isOnPlayer) {
			videoControls.classList.add('display-control');	
				
		}
		clearTimeout(timer);
		timer = setTimeout(hideControls, 3000);
	});



})();
