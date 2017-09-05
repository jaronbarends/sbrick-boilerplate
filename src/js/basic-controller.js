(() => {

	// tell jshint about globals (they should remain commented out)
	/* globals SBrick */ //Tell jshint SBrick exists as global var

	let mySBrick,
		sensorTimer,
		sensorTimeoutIsCancelled = false,
		sensorSwitch;


	//-- Start generic functions for controlling appliances
	

		/**
		* read sensor data and send event
		* @param {number} portId - The id of the port to read sensor data from
		* @returns {undefined}
		*/
		// TODO: I think this should be implemented in sbrick.js
		const getSensorData = function(portId) {
			mySBrick.getSensor(portId, 'wedo')
				.then((sensorData) => {
					// sensorData: { type, voltage, ch0_raw, ch1_raw, value }
					const event = new CustomEvent('sensorchange.sbrick', {detail: sensorData});
					//TODO event should only be sent if sensorvalue really changes
					document.body.dispatchEvent(event);

					clearTimeout(sensorTimer);// clear timeout within then-clause so it will always clear right before setting new one
					if (!sensorTimeoutIsCancelled) {
						// other functions may want to cancel the sensorData timeout
						// but they can't call clearTimeout, because that might be called when the promise is pending
						sensorTimer = setTimeout(() => {getSensorData(portId);}, 200);
					}
				});
		}

	//-- End generic functions for controlling appliances


	/**
	* start the lights
	* @returns {undefined}
	*/
	const startLights = function(e) {
		e.preventDefault();
		const data = {
			portId: mySBrick.TOPLEFT,
			power: 100
		};
		mySBrick.setLights(data);
	};


	/**
	* start the drive motor
	* @returns {undefined}
	*/
	const startDrive = function(e) {
		e.preventDefault();
		const data = {
			portId: mySBrick.BOTTOMLEFT,
			power: 100,
			direction: SBrick.CLOCKWISE
		};
		mySBrick.setDrive(data);
	};


	/**
	* turn the servo motor
	* @returns {undefined}
	*/
	const startServo = function(e) {
		e.preventDefault();
		const data = {
			portId: mySBrick.TOPRIGHT,
			angle: 45,
			direction: SBrick.CLOCKWISE
		};
		mySBrick.setServo(data);
	};

	

	/**
	* stop the sensor
	* @returns {undefined}
	*/
	const startSensor = function() {
		const portId = mySBrick.BOTTOMRIGHT;
		mySBrick.startSensor(portId);
	};


	/**
	* stop the sensor
	* @returns {undefined}
	*/
	const stopSensor = function() {
		const portId = mySBrick.BOTTOMRIGHT;
		mySBrick.stopSensor(portId);
	};


	/**
	* stop all ports
	* @returns {undefined}
	*/
	const stopAll = function(e) {
		e.preventDefault();
		mySBrick.stopAll();
	};



	//-- Start handling incoming data


		/**
		* handle when port has changed
		* @param {event} e - portchange.sbrick event sent by sbrick.js event.detail: {portId, direction, power}
		* @returns {undefined}
		*/
		const portchangeHandler = function(e) {
			let data = e.detail;
			// do something useful for controller with updated port data
			window.util.log('portchange:', data.portId, data.power, data.direction);
		};



		/**
		* handle when sensor has changed
		* @param {event} e - sensorchange.sbrick event; At this time sent by this very script; should me moved to sbrick.js
		* @returns {undefined}
		*/
		const sensorchangeHandler = function(e) {
			let data = e.detail;
			// here you can make changes to controller that need to happen when sensor changes
			window.util.log('sensorchange:', data.portId, data.power, data.direction);
		};



		/**
		* handle starting of sensor
		* @param {event} e - * @param {event} e - sensorstart.sbrick event; At this time sent by this very script; should me moved to sbrick.js
		* @returns {undefined}
		*/
		const sensorstartHandler = function(e) {
			// here you can make changes to controller, like setting start sensor button's state
		};


		/**
		* handle starting of sensor
		* @param {event} e - * @param {event} e - sensorstop.sbrick event; At this time sent by this very script; should me moved to sbrick.js
		* @returns {undefined}
		*/
		const sensorstopHandler = function(e) {
			// here you can make changes to controller, like setting start sensor button's state
		};


	//-- End handling incoming data
	
	

	/**
	* initialize event listeners for sbrick events
	* so we can update controller status based on events
	* @returns {undefined}
	*/
	const initSBrickEventListeners = function() {
		// set listeners for sbrick events
		document.body.addEventListener('portchange.sbrick', portchangeHandler);
		document.body.addEventListener('sensorchange.sbrick', sensorchangeHandler);
   		document.body.addEventListener('sensorstart.sbrick', sensorstartHandler);
   		document.body.addEventListener('sensorstop.sbrick', sensorstopHandler);
	};


	/**
	* initialize controls to send stuff to SBrick
	* @returns {undefined}
	*/
	const initControls = function() {
		document.getElementById('start-lights').addEventListener('click', startLights);
		document.getElementById('start-drive').addEventListener('click', startDrive);
		document.getElementById('start-servo').addEventListener('click', startServo);
		document.getElementById('start-sensor').addEventListener('click', startSensor);
		document.getElementById('stop-sensor').addEventListener('click', stopSensor);
		document.getElementById('stop-all').addEventListener('click', stopAll);
	};
	



	/**
	* initialize all functionality
	* @param {string} varname - Description
	* @returns {undefined}
	*/
	const init = function() {
		window.mySBrick = window.mySBrick || new SBrickExtended();
		mySBrick = window.mySBrick;

		initSBrickEventListeners();
		initControls();
	};

	// kick of the script when all dom content has loaded
	document.addEventListener('DOMContentLoaded', init);

})();
