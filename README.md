Right Angle
===

This is a test automation framework for Protractor.

I got tired of updating this README file as I explore Right Angle's API design possibilities, so I'll try again when it's more stable.

You can see it doing its thing here: [asciinema.org/a/17746](https://asciinema.org/a/17746).

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
