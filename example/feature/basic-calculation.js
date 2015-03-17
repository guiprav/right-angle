var tf = require("right-angle");
module.exports = {
	name: "Basic Calculations.",
	beforeEach: function() {
		when("I go to 'https://juliemr.github.io/protractor-demo/'");
	},
	scenarios: {
		"Add two numbers": {
			run: function() {
				given("I add '{{first}}' and '{{second}}'");
				then("I should see '{{result}}' as a result");
			},
			data: function() {
				return [
					{ first: 1, second: 2, result: 3 },
					{ first: 2, second: 8, result: 10 },
					{ first: 3, second: 4, result: 7 },
					{ first: 4, second: 5, result: 9 }
				];
			}
		},
		"Subtract two numbers": {
			run: function() {
				given("I subtract '{{first}}' from '{{second}}'");
				then("I should see '{{result}}' as a result");
			},
			data: function() {
				return [
					{ first: 1, second: 2, result: 1 },
					{ first: 2, second: 8, result: 6 },
					{ first: 3, second: 4, result: 1 },
					{ first: 4, second: 5, result: 1 }
				];
			}
		},
		"Multiply two numbers": {
			run: function() {
				given("I multiply '{{first}}' by '{{second}}'");
				then("I should see '{{result}}' as a result");
			},
			data: function() {
				return [
					{ first: 1, second: 2, result: 2 },
					{ first: 2, second: 8, result: 16 },
					{ first: 3, second: 4, result: 12 },
					{ first: 4, second: 5, result: 20 }
				];
			}
		},
		"Divide two numbers": {
			run: function() {
				given("I divide '{{first}}' by '{{second}}'");
				then("I should see '{{result}}' as a result");
			},
			data: function() {
				return [
					{ first: 1, second: 2, result: 0.5 },
					{ first: 2, second: 8, result: 0.25 },
					{ first: 3, second: 4, result: 0.75 },
					{ first: 4, second: 5, result: 0.8 }
				];
			}
		}
	}
};
