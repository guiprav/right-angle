var tf = require("right-angle");
var using = tf.loadSteps;
module.exports = {
	name: "Basic Calculations.",
	beforeEach: function() {
		using("Navigation")
			.when("I go to 'https://juliemr.github.io/protractor-demo/'")
		;
	},
	scenarios: [
		{
			name: "Add '{{first}}' and '{{second}}'.",
			run: function(data) {
				using("Basic Calculation")
					.given("I type '{{first}}' in the first number field")
					.and("I select '{{operator}}' from the operators dropdown")
					.and("I type '{{second}}' in the second number field")
					.when("I click 'Go!'")
					.then("I should see '{{result}}' as a result")
				;
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
