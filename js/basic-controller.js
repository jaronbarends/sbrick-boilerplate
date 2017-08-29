(() => {

	// tell jshint about globals (they should remain commented out)
	/* globals SBrick */ //Tell jshint SBrick exists as global var

	let mySBrick,
		sensorTimer,
		sensorTimeoutIsCancelled = false,
		sensorSwitch;



	/**
	* update a set of lights
	* @param {object} data - New settings for this port {portId, power, direction}
	* @returns {undefined}
	*/
	const setLights = function(data) {
		data.power = Math.round(mySBrick.MAX * data.power/100);
		mySBrick.drive(data);
	};



	/**
	* update a drive motor
	* @param {object} data - New settings for this port {portId, power, direction}
	* @returns {undefined}
	*/
	const setDrive = function(data) {
		data.power = window.sbrickUtil.drivePercentageToPower(data.power);
		mySBrick.drive(data);
	};



	/**
	* update a servo motor
	* @param {object} data - New settings for this port {portId, power, direction}
	* @returns {undefined}
	*/
	const setServo = function(data) {
		data.power = window.sbrickUtil.servoAngleToPower(data.power);
		mySBrick.drive(data);
	};



	/**
	* handle when port has changed
	* @param {event} e - portchange.sbrick event sent by sbrick.js event.detail: {portId, direction, power}
	* @returns {undefined}
	*/
	const portchangeHandler = function(e) {
		let data = e.detail;
		// do something useful with updated port data
	};



	/**
	* handle when sensor has changed
	* @param {event} e - sensorchange.sbrick event; At this time sent by this very script; should me moved to sbrick.js
	* @returns {undefined}
	*/
	const sensorchangeHandler = function(e) {
		let data = e.detail;
		// do something useful with read sensor data
	};

	

	/**
	* read sensor data and send event
	* @param {number} portId - The id of the port to read sensor data from
	* @returns {undefined}
	*/
	// TODO: I think this should be implemented in sbrick.js
	const getSensorData = function(portId) {
		mySBrick.getSensor(portId, 'wedo')
			.then((m) => {
				let sensorData = m;// { type, voltage, ch0_raw, ch1_raw, value }
				const event = new CustomEvent('sensorchange.sbrick', {detail: sensorData});
				document.body.dispatchEvent(event);

				clearTimeout(sensorTimer);// clear timeout within then-clause so it will always clear right before setting new one
				if (!sensorTimeoutIsCancelled) {
					// other functions may want to cancel the sensorData timeout
					// but they can't call clearTimeout, because that might be called when the promise is pending
					sensorTimer = setTimeout(() => {getSensorData(portId);}, 20);
				}
			});
	}

	

	/**
	* stop the sensor
	* @returns {undefined}
	*/
	const startSensor = function(portId) {
		sensorTimeoutIsCancelled = false;
		getSensorData(portId);

		const event = new CustomEvent('sensorstart.sbrick', {detail: {portId}});
		document.body.dispatchEvent(event);
	};


	/**
	* stop the sensor
	* @returns {undefined}
	*/
	const stopSensor = function(portId) {
		// sensorData timeout is only set when the promise resolves
		// but in the time the promise is pending, there is no timeout to cancel
		// so let's set a var that has to be checked before calling a new setTimeout
		sensorTimeoutIsCancelled = true;

		const event = new CustomEvent('sensorstop.sbrick', {detail: {portId}});
		document.body.dispatchEvent(event);
	};


	/**
	* handle starting of sensor
	* @param {event} e - * @param {event} e - sensorstart.sbrick event; At this time sent by this very script; should me moved to sbrick.js
	* @returns {undefined}
	*/
	const sensorstartHandler = function(e) {
		// do something useful here, like setting start sensor button's state
	};


	/**
	* handle starting of sensor
	* @param {event} e - * @param {event} e - sensorstop.sbrick event; At this time sent by this very script; should me moved to sbrick.js
	* @returns {undefined}
	*/
	const sensorstopHandler = function(e) {
		// do something useful here, like setting start sensor button's state
	};
	
	

	/**
	* initialize controlPanel
	* @returns {undefined}
	*/
	const initEventListeners = function() {
		// set listeners for sbrick events
		document.body.addEventListener('portchange.sbrick', portchangeHandler);
		document.body.addEventListener('sensorchange.sbrick', sensorchangeHandler);
   		document.body.addEventListener('sensorstart.sbrick', sensorstartHandler);
   		document.body.addEventListener('sensorstop.sbrick', sensorstopHandler);
	};



	/**
	* initialize all functionality
	* @param {string} varname - Description
	* @returns {undefined}
	*/
	const init = function() {
		window.mySBrick = window.mySBrick || new SBrick();
		mySBrick = window.mySBrick;

		initEventListeners();
	};

	// kick of the script when all dom content has loaded
	document.addEventListener('DOMContentLoaded', init);

})();
