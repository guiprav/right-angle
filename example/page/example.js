var locators = {};
module.exports = {
	name: "Example page",
	find: function(locator_name) {
		var locator_parameters = [].slice.call(arguments, 1);
		return locators[locator_name].apply(this, locator_parameters);
	}
};
locators["login-button"] = function() {
	return "Fake 'Log In' button";
};
