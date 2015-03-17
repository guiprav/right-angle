var tf = require("right-angle");
var calc = tf.loadPage("calculator");
module.exports = {
	"I (add|subtract|multiply|divide) '(.*)' (and|by|from) '(.*)'": {
		composite: true,
		run: function(operation, first, conjunction, second) {
			var operator = {
				"add": "+",
				"subtract": "-",
				"multiply": "*",
				"divide": "/"
			} [
				operation
			];
			if(conjunction === 'from') {
				(function() {
					var tmp = first;
					first = second;
					second = tmp;
				})();
			}
			given("I type '" + first + "' in the first number field");
			and("I select '" + operator + "' from the operators dropdown");
			and("I type '" + second + "' in the second number field");
			and("I click 'Go!'");
		}
	},
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
