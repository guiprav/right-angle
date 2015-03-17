Right Angle
===

This is a test automation framework for Protractor.

It structures test suites in terms of Pages, Features, Scenarios, and Steps.

Right Angle will automatically load all feature files from the 'feature/' directory and execute each of the defined feature test scenarios. Those scenarios are basically functions that invoke steps. E.g.:

```js
// feature/login.js:
var tf = require("right-angle");
var using = tf.loadSteps;
module.exports = {
	name: "Log In.",
	beforeEach: function() {
		using("Navigation")
			.when("I go to '/login' page");
		;
	},
	scenarios: {
		"Logging in with proper credentials.": function() {
			using("Login")
				.given (
					"I type in my credentials in the form", {
						user: "TestUser",
						password: "TestPassword"
					}
				)
				.when("I submit the form")
			;
			using("Navigation")
				.then("I should be redirected to '/home' page")
			;
			using("Alerts")
				.and("I should see a success message containing the string 'welcome back'")
			;
		},
		"Logging in with invalid credentials.": function() {
			using("Login")
				.given (
					"I type in my credentials in the form", {
						user: "BadUser",
						password: "BadPassword"
					}
				)
				.when("I submit the form")
			;
			using("Navigation")
				.then("I should be redirected to '/login' page")
			;
			using("Alerts")
				.and("I should see an error message containing the string 'invalid user name or password'")
			;
		}
	}
};
```

Some scenarios are single functions, but not all.

If a scenario is an object with a `data` property (either a value, an array of values, or a function returning one of those two), its `run` function is invoked once for every value in the array (or once if `data` isn't an array or hasn't returned an array). In those cases, `run`'s first argument is the data for each run. Such scenarios are said to be data-driven.

Data-driven scenario names and step descriptions are actually Handlebars templates which are fed with each run's test data. See [example/feature/basic-calculation.js](example/feature/basic-calculation.js) for an example, and see [this terminal session](http://asciinema.org/a/17703) to see it working.

Steps are automatically loaded from step bundle files in the 'step/' directory. Step bundles are nothing but a way to group related steps. Step grouping rules are up to you, but generally you'll have more generic bundles for common page operations, such as navigating to specific URLs, and more specific bundles maybe named after the features or scenarios they're used in.

Step definitions are actually regular expressions, e.g.:

```js
"I get redirected to '(.*)'": function(where) {
	expect(browser.getCurrentUrl()).toBe(where);
}
```

Invocations like `using("Navigation").when("When I go to '/login' page")` will have their step descriptions ("When I go to '/login' page") matched against step regular expressions from that bundle ("Navigation"). The first matched step is executed, with regular expression results passed as arguments (`"/login"`, in the case above).

All other arguments passed to `given`, `and`, `when`, and `then` are forwarded to the step function. That's useful when step parameters are too long or complicated to fit nicely in a string, or contain sensitive data (e.g. the Login example above).

To derive step bundle file names from `using` invocations, Right Angle simply converts the name to lower case, replaces all spaces by dashes, and appends `".js"` to it.

Pages are modules implementing the Page Object pattern: They usually contain element locators and maybe other page-specific goodies.

The `page` function can be used to access those modules. E.g.: `page('login')` will require the 'page/login.js' module and return it.

Installing
---

To install Right Angle, use `npm`:

	$ npm install n2liquid/right-angle

I recommend having a `package.json` file for your project and using:

	$ npm install --save n2liquid/right-angle

instead. This will install the package and add it as a dependency to your `package.json` file.

In your Protractor configuration file, in order to activate Right Angle, you must let it configure Protractor. See [example/protractor.conf.js](example/protractor.conf.js).

To run your tests, simply invoke Protractor using your own configuration file:

	$ protractor my-protractor.conf.js

(This requires Protractor to be installed globally. Also, don't forget to run the WebDriver first with `webdriver-manager start`).

Example project
---

Right Angle comes with [an example test automation project](example/) (a partial port of [the official Protractor tutorial](https://angular.github.io/protractor/#/tutorial)). To run it, you can do this:

	# Clone this repository.
	$ git clone https://github.com/n2liquid/right-angle.git

	# Change into example directory.
	$ cd right-angle/example/

	# Install dependencies.
	$ npm install

	# Run the WebDriver (If not yet running).
	# This requires Protractor to be installed globally!
	$ webdriver-manager start

	# And finally, run the tests.
	$ npm test

From looking at the files in the 'example/' directory, you can have a good idea how everything fits together.

Copying
---

Copyright (c) 2015, Guilherme Prá Vieira (super.driver.512@gmail.com).

Right Angle is free software.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

Exclusion of warranty
---

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
