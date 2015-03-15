var tf = require("right-angle");
var step = tf.runStep;
module.exports = {
	name: "Basic Calculations.",
	beforeEach: function() {
		step("Navigation: I go to 'https://juliemr.github.io/protractor-demo/'");
	},
	scenarios: [
		{
			name: "Add '{{first}}' and '{{second}}'.",
			run: function(data) {
				step("Basic Calculation: I type '{{first}}' in the first number field");
				step("Basic Calculation: I select '{{operator}}' from the operators dropdown");
				step("Basic Calculation: I type '{{second}}' in the second number field");
				step("Basic Calculation: I click 'Go!'");
				step("Basic Calculation: I should see '{{result}}' as a result");
			},
			data: function() {
				return [
					{ operator: '+', first: 1, second: 2, result: 3 },
					{ operator: '-', first: 3, second: 2, result: 1 },
					{ operator: '*', first: 2, second: 3, result: 6 },
					{ operator: '/', first: 8, second: 2, result: 4 }
				];
			}
		}
	]
};
