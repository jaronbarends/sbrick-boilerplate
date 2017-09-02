(() => {

	// (optional) tell jshint about globals (they should remain commented out)
	/* globals SBrick */ //Tell jshint someGlobalVar exists as global var

	let body = document.body,
		mySbrick;



	/**
	* handle change of port power
	* @param {event} e - portchange.sbrick event with detail: portObjs {portId, power, direction}
	* @returns {undefined}
	*/
	// TODO: sbrick.js does seem to send consecutive portchange events for quickDrive, instead of just 1
	// so change that in sbrick.js
	const portchangeHandler = function(e) {
		let portObjs = e.detail;
		if (!Array.isArray(portObjs)) {
			portObjs = [portObjs];
		}

		portObjs.forEach((portObj) => {
			// do something useful here
		});

	};


	/**
	* handle change of sensor value
	* @param {event} e - sensorchange.sbrick event; At this time sent by button-controller.js; should me moved to sbrick.js
	* @returns {undefined}
	*/
	const sensorchangeHandler = function(e) {
		const sensorData = e.detail,
			sensorType = sensorData.type;// tilt | motion
			sensorInterpration = window.sbrickUtil.getSensorInterpretation(sensorData.value, sensorType);

		// do something useful here
		window.util.log(sensorType, sensorInterpration);
	};
	
	

	/**
	* add listeners for changed ports
	* @returns {undefined}
	*/
	const addEventListeners = function() {
		body.addEventListener('portchange.sbrick', portchangeHandler);
		body.addEventListener('sensorchange.sbrick', sensorchangeHandler);
	};



	/**
	* initialize all functionality
	* @returns {undefined}
	*/
	const init = function() {
		window.mySBrick = window.mySBrick || new SBrickExtended();
		mySBrick = window.mySBrick;
		
		addEventListeners();
	};



	// kick of the script when all dom content has loaded
	document.addEventListener('DOMContentLoaded', init);

})();
