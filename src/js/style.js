(function () {
	'use strict';

	// display controls for starting 5 seconds then disappear
	// var videoControls = document.getElementById('video-controls');

	// (function showControlsTimeout(videoControls) {
	// 	videoControls.classList.add('display-control');
	// 	setTimeout(function () {
	// 		videoControls.classList.remove('display-control');
	// 	}, 5000);
	// })(videoControls)

	// hide controls in case of no mouse or touch activity for 10 seconds
	var videoControls = document.getElementById('video-controls');
	var video = document.getElementById('video');
	var player = document.getElementsByClassName('player')[0];
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
        if (e.parentNode == this || e == this) {
           return;
        }
		isOnPlayer=false;
		hideControls();	
	});

	function hideControls() {
		if (! video.paused) {
			videoControls.classList.remove('display-control');
			if(isOnPlayer) {
				document.body.style.cursor = none;
			}
		}
	}

	var timer = setTimeout(hideControls, 3000);

	document.addEventListener("mousemove", function () {
		console.log(isOnPlayer);
		document.body.style.cursor = auto;
		if(isOnPlayer) {
			videoControls.classList.add('display-control');	
				
		}
		clearTimeout(timer);
		timer = setTimeout(hideControls, 3000);
	});



})();
