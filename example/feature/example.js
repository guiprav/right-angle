var tf = require("right-angle");
var step = tf.runStep;
module.exports = {
	name: "Example feature.",
	scenarios: [
		{
			name: "Example scenario.",
			run: function() {
				step("Example: Log 'A test message.'");
				step("Example: Has 'example.login-button' element");
				step("Example: Fail");
			}
		}
	]
};
