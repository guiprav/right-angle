"use strict";
require('array.prototype.find');
var resolve_path = require("path").resolve;
var glob = require("glob");
var hbs = require("handlebars");
var framework_config = {};
var features = {};
var current_test_data;
module.exports = {
	configure: function(config) {
		var rightAngleConfig = config.rightAngle || {};
		config.specs = config.specs || [];
		config.jasmineNodeOpts = config.jasmineNodeOpts || {};
		config.specs.push(__dirname + "/run-spec.js");
		if(config.jasmineNodeOpts.isVerbose === undefined) {
			config.jasmineNodeOpts.isVerbose = true;
		}
		framework_config.pages_path = rightAngleConfig.pagesPath || './page';
		framework_config.features_path = rightAngleConfig.featuresPath || './feature';
		framework_config.steps_path = rightAngleConfig.stepsPath || './step';
		return config;
	},
	run: function() {
		var feature_name;
		var feature;
		glob.sync(resolve_path(framework_config.features_path, "*.js")).forEach (
			function(feature_file) {
				var feature = require(resolve_path(feature_file));
				if(features[feature.name]) {
					throw new Error("Feature \"" + feature.name + "\" is already defined.");
				}
				features[feature.name] = feature;
			}
		);
		for(feature_name in features) {
			feature = features[feature_name];
			describe (
				feature_name, function() {
					if(feature.beforeAll) {
						feature.beforeAll();
					}
					feature.scenarios.forEach (
						function(scenario) {
							var data;
							if(typeof(scenario.data) === 'function') {
								data = scenario.data();
							}
							else {
								data = scenario.data;
							}
							if(!Array.isArray(data)) {
								data = [data];
							}
							data.forEach (
								function(data) {
									var scenario_name;
									if(data) {
										scenario_name = hbs.compile(scenario.name)(data);
									}
									else {
										scenario_name = scenario.name;
									}
									current_test_data = data;
									describe (
										scenario_name, function() {
											if(feature.beforeEach) {
												feature.beforeEach();
											}
											scenario.run(data);
										}
									);
									current_test_data = null;
								}
							);
						}
					);
				}
			);
		}
	},
	loadSteps: function(bundle_name) {
		var bundle;
		bundle_name = bundle_name.toLowerCase().replace(/ /g, "-");
		bundle = require(resolve_path(framework_config.steps_path, bundle_name + '.js'));
		return new CucumberWrapper(bundle_name, bundle);
	},
	loadPage: function(name) {
		return require(resolve_path(framework_config.pages_path, name + ".js"));
	}
};
function CucumberWrapper(bundle_name, bundle) {
	this.bundle_name = bundle_name;
	this.bundle = bundle;
}
CucumberWrapper.prototype.given = function() {
	return this.runStep.apply (
		this, ["Given"].concat([].slice.call(arguments, 0))
	);
};
CucumberWrapper.prototype.and = function() {
	return this.runStep.apply (
		this, ["And"].concat([].slice.call(arguments, 0))
	);
};
CucumberWrapper.prototype.when = function() {
	return this.runStep.apply (
		this, ["When"].concat([].slice.call(arguments, 0))
	);
};
CucumberWrapper.prototype.then = function() {
	return this.runStep.apply (
		this, ["Then"].concat([].slice.call(arguments, 0))
	);
};
CucumberWrapper.prototype.runStep = function(prefix, statement) {
	var wrapper = this;
	var step_key;
	var step_regex_result;
	var extra_step_parameters = [].slice.call(arguments, 2);
	if(current_test_data) {
		statement = hbs.compile(statement)(current_test_data);
	}
	step_key = Object.keys(wrapper.bundle).find (
		function(step_regex) {
			return (step_regex_result = new RegExp("^" + step_regex + "$").exec(statement));
		}
	);
	if(!step_key) {
		throw new Error("No steps in bundle '" + wrapper.bundle_name + "' matching \"" + statement + "\".");
	}
	it (
		prefix + " " + statement, function() {
			wrapper.bundle[step_key].apply(null, step_regex_result.slice(1).concat(extra_step_parameters));
		}
	);
	return wrapper;
}
