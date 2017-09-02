/*
 * Copyright (c) 2017 Jarón Barends
 *
 * @author Jarón Barends
 * @website jaron.nl
 *
 * Child-class of sbrick.js with some additional functionality
 *
 * Requires sbrick.js, bluetooth.js and promise-queue library
 * https://github.com/360fun/sbrick.js
 * https://github.com/360fun/bluetooth.js
 * https://github.com/azproduction/promise-queue
 *
 * This code is compatible with SBrick Protocol 4.17
 * https://social.sbrick.com/wiki/view/pageId/11/slug/the-sbrick-ble-protocol
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

let SBrickExtended = (function() {
	'use strict';

	

	// Sbrick class definition
	class SBrickExtended extends SBrick {

		// CONSTRUCTOR


		/**
		* Create a new instance of the SBrickExtended class (and accordingly also WebBluetooth)
		* @param {string} sbrick_name - The name of the sbrick
		*/
		constructor( sbrick_name ) {
			super( sbrick_name);

			// make vars available for outside world
			this.PORTS = {
				TOP_LEFT: 0,
				BOTTOM_LEFT: 1,
				TOP_RIGHT: 2,
				BOTTOM_RIGHT: 3
			};
		}



	}

	return SBrickExtended;

})();
