'use strict';
var tf = require('right-angle');
module.exports = {
	"Log message": function(message) {
		console.log(message);
	},
	"Has element": function(page_name, locator_name) {
		expect(tf.page(page_name).find(locator_name)).toBeTruthy();
	},
	"Fail": function() {
		expect(false).toBe(true);
	}
};
