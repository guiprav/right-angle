var tf = require("right-angle");
var calc = tf.loadPage("calculator");
module.exports = {
	"I type '(.*)' in the first number field": function(what) {
		calc.enterFirstNumber(what);
	},
	"I select '(.*)' from the operators dropdown": function(which_one) {
		calc.selectOperator(which_one);
	},
	"I type '(.*)' in the second number field": function(what) {
		calc.enterSecondNumber(what);
	},
	"I click 'Go!'": function() {
		calc.go();
	},
	"I should see '(.*)' as a result": function(what) {
		expect(calc.result()).toBe(what.toString());
	}
};
