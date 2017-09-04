(() => {

	// (optional) tell jshint about globals (they should remain commented out)
	/* globals SBrick */ //Tell jshint someGlobalVar exists as global var


	const logMsgBox = document.getElementById('log-msg-box');


	/**
	* clear the log window
	* @returns {undefined}
	*/
	const clearLog = function() {
		logMsgBox.innerHTML = '';
	};
	

	/**
	* log to page's log window
	* @returns {undefined}
	*/
	let log = function(...msg) {// use let instead of const so we can reassign to console.log
		msg = msg.join(' ');
		logMsgBox.innerHTML += '<p>' + msg + '</p>';
	};
	


	/**
	* 
	* @returns {undefined}
	*/
	const init = function() {
		document.getElementById('clear-log').addEventListener('click', clearLog);		
	};
	

	document.addEventListener('DOMContentLoaded', init);


	// now make functions available to outside world
	window.util = window.util || {};
	window.util = {
		log
	};


})();