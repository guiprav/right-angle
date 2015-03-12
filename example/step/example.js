'use strict';
module.exports = {
	"Log message": function(message) {
		console.log(message);
	},
	"Fail": function() {
		expect(false).toBe(true);
	}
};
