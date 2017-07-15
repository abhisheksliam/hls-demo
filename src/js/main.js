(function () {
	'use strict';

		

		var player = document.getElementById('player'),
			video = document.getElementById('video'),
			videoControls = document.getElementById('video-controls'),
			playpause = document.getElementById('playpause'),
			mute = document.getElementById('mute'),
			progress = document.getElementById('progress'),
			progressBar = document.getElementById('progress-bar');


		video.controls = false;
		// Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
		if (document.addEventListener) {

			// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
			video.addEventListener('loadedmetadata', function() {
				progress.setAttribute('max', video.duration);
			});

			// Changes the button state of certain button's so the correct visuals can be displayed with CSS
			var changeButtonState = function(type) {
				// Play/Pause button
				if (type == 'playpause') {
					if (video.paused || video.ended) {
						playpause.setAttribute('data-state', 'play');
						videoControls.classList.add('display-control');
					}
					else {
						playpause.setAttribute('data-state', 'pause');
						showControlsTimeout(videoControls);
					}
				}
				// Mute button
				else if (type == 'mute') {
					mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
				}
			}

			function showControlsTimeout(videoControls) {
				videoControls.classList.add('display-control');
				setTimeout(function () {
					videoControls.classList.remove('display-control');
				}, 5000);
			}

			// Add event listeners for video specific events
			video.addEventListener('play', function() {
				changeButtonState('playpause');
			}, false);
			video.addEventListener('pause', function() {
				changeButtonState('playpause');
			}, false);

			// Add events for all buttons
			playpause.addEventListener('click', function(e) {
				if (video.paused || video.ended) video.play();
				else video.pause();
			});

			mute.addEventListener('click', function(e) {
				video.muted = !video.muted;
				changeButtonState('mute');
			});

			// As the video is playing, update the progress bar
			video.addEventListener('timeupdate', function() {
				// For mobile browsers, ensure that the progress element's max attribute is set
				if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
				progress.value = video.currentTime;
				progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
			});

			// React to the user clicking within the progress bar
			progress.addEventListener('click', function(e) {
				// var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth; // Also need to take the parent into account here as .controls now has position:relative
				var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft + player.offsetLeft)) / this.offsetWidth;
				video.currentTime = pos * video.duration;
			});


		}

 })();
