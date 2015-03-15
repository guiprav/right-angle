var tf = require("right-angle");
var step = tf.runStep;
module.exports = {
	name: "Basic Calculations.",
	beforeEach: function() {
		step("Navigation: I go to 'https://juliemr.github.io/protractor-demo/'");
	},
	scenarios: [
		{
			name: "Add two numbers.",
			run: function() {
				step("Basic Calculation: I type '1' in the first number field");
				step("Basic Calculation: I select '+' from the operators dropdown");
				step("Basic Calculation: I type '2' in the second number field");
				step("Basic Calculation: I click 'Go!'");
				step("Basic Calculation: I should see '3' as a result");
			}
		}
	]
};
