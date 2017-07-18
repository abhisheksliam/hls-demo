(function () {
	'use strict';

	// Hide controls in case of no mouse or touch activity for 10 seconds
	var videoControls = document.getElementById('video-controls'),
		video = document.getElementById('video'),
		player = document.getElementById('player');

	// Display controls on mouseover
	player.addEventListener("mouseover", function () {
		videoControls.classList.add('display-control');
	});

	// Hide controls on mouse out of video
	var isOnPlayer = false;

	player.addEventListener("mouseenter", function () {
		isOnPlayer = true;
	});

	// Make mouse out function for nested children
	function makeMouseOutFn(elem) {
		var list = traverseChildren(elem);
		return function onMouseOut(event) {
			var e = event.toElement || event.relatedTarget;
			if (!!~list.indexOf(e)) {
				return;
			}
			isOnPlayer = false;
			hideControls();
		};
	}

	player.addEventListener('mouseout', makeMouseOutFn(player), true);

	// Hide controls if no mouse movement for 12 seconds
	var timer = setTimeout(hideControls, 12000);
	document.addEventListener("mousemove", function () {
		if (isOnPlayer) {
			videoControls.classList.add('display-control');
		}
		clearTimeout(timer);
		timer = setTimeout(hideControls, 12000);
	});

	function hideControls() {
		if (!video.paused) {
			videoControls.classList.remove('display-control');
		}
	};

	// Utility function for traverse children nodes
	function traverseChildren(elem) {
		var children = [];
		var q = [];
		q.push(elem);
		while (q.length > 0) {
			var elem = q.pop();
			children.push(elem);
			pushAll(elem.children);
		}
		function pushAll(elemArray) {
			for (var i = 0; i < elemArray.length; i++) {
				q.push(elemArray[i]);
			}
		}
		return children;
	};

})();
