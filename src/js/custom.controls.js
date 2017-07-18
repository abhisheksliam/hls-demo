(function () {
	'use strict';

	var player = document.getElementById('player'),
		video = document.getElementById('video'),
		videoControls = document.getElementById('video-controls'),
		playpause = document.getElementById('playpause'),
		mute = document.getElementById('mute'),
		progress = document.getElementById('progress'),
		progressBar = document.getElementById('progress-bar');

	var	videoSource = video.getAttribute('data-src');

	video.controls = false;

	// HLS video init
	if (Hls.isSupported()) {
		var hls = new Hls();
		hls.loadSource(videoSource);
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED, function () {
			video.play();
			initVideoQualityOptions(hls);
		});
	}

	// Add events for buttons
	playpause.addEventListener('click', function (e) {
		if (video.paused || video.ended) video.play();
		else video.pause();
	});

	mute.addEventListener('click', function (e) {
		video.muted = !video.muted;
		changeButtonState('mute');
	});

	// React to the user clicking within the progress bar
	progress.addEventListener('click', function (e) {
		var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft + player.offsetLeft)) / this.offsetWidth;
		video.currentTime = pos * video.duration;
	});


	// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
	video.addEventListener('loadedmetadata', function () {
		progress.setAttribute('max', video.duration);
	});

	// Add event listeners for video specific events
	video.addEventListener('play', function () {
		changeButtonState('playpause');
	}, false);
	video.addEventListener('pause', function () {
		changeButtonState('playpause');
	}, false);

	// As the video is playing, update the progress bar
	video.addEventListener('timeupdate', function () {
		if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
		progress.value = video.currentTime;
		progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
	});

	// Changes the button state of certain button's so the correct visuals can be displayed with CSS
	function changeButtonState(type) {
		// Play/Pause button
		if (type == 'playpause') {
			if (video.paused || video.ended) {
				playpause.setAttribute('data-state', 'play');
				videoControls.classList.add('display-control');
			}
			else {
				playpause.setAttribute('data-state', 'pause');
			}
		}
		// Mute button
		else if (type == 'mute') {
			mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
		}
	};

	// Video Quality Controls

	function initVideoQualityOptions(hls) {

		var qualityBtn = document.getElementById('quality-btn');
		var quality = document.getElementById('quality');

		// update current selection, because quality is auto by default
		// quality.addEventListener('focus', function (event) {
		// 	this.selectedIndex = hls.currentLevel;
		// });

		//todo: update current selection

		// update selection on manual change
		qualityBtn.addEventListener('click', function (event) {
			var q_level = parseInt(this.value);
			hls.currentLevel = q_level;
		});

		//Create and append the options
		var qualities = hls.levels;
		for (var i = 0; i < qualities.length; i++) {
			var q = document.createElement("a");
			// q.value = i;
			q.setAttribute("data-value", i);
			q.setAttribute("class", "quality");
			q.text = qualities[i].name + 'p';
			quality.appendChild(q);
		}
	};
})();
