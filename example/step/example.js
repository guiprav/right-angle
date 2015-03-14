"use strict";
var tf = require("right-angle");
var page = tf.page;
module.exports = {
	"Log '(.*)'": function(message) {
		console.log(message);
	},
	"Has '(.*)\\.(.*)' element": function(page_name, locator_name) {
		expect(page(page_name).find(locator_name)).toBeTruthy();
	},
	"Fail": function() {
		expect(false).toBe(true);
	}
};
