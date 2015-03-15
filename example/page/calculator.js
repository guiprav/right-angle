module.exports = {
	enterFirstNumber: function(number) {
		element(by.model('first')).sendKeys(number);
	},
	enterSecondNumber: function(number) {
		element(by.model('second')).sendKeys(number);
	},
	selectOperator: function(operator) {
		element(by.model('operator'))
			.element(by.cssContainingText('option', operator))
			.click()
		;
	},
	go: function() {
		element(by.id('gobutton')).click();
	},
	result: function() {
		return element(by.binding('latest')).getText();
	}
};
