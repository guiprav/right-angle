"use strict";
require('array.prototype.find');
var resolve_path = require("path").resolve;
var glob = require("glob");
var framework_config = {};
var features = {};
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
						describe (
							"'Before all scenarios' steps:", function() {
								feature.beforeAll();
							}
						);
					}
					feature.scenarios.forEach (
						function(scenario) {
							describe (
								scenario.name, function() {
									if(feature.beforeEach) {
										describe (
											"'Before scenario' steps:", function() {
												feature.beforeEach();
											}
										);
									}
									describe (
										"Steps:", function() {
											scenario.run();
										}
									);
								}
							);
						}
					);
				}
			);
		}
	},
	runStep: function(step_statement) {
		var step_statement_parts;
		var bundle_name;
		var bundle;
		var rest;
		var step_key;
		var step_regex_result;
		var other_step_parameters = [].slice.call(arguments, 1);
		step_statement_parts = step_statement.split(':', 2);
		bundle_name = step_statement_parts[0].toLowerCase().replace(/ /g, '-');
		rest = step_statement_parts[1].trim();
		bundle = require(resolve_path(framework_config.steps_path, bundle_name + '.js'));
		step_key = Object.keys(bundle).find (
			function(step_regex) {
				return (step_regex_result = new RegExp("^" + step_regex + "$").exec(rest));
			}
		);
		if(!step_key) {
			throw new Error("No steps in bundle '" + bundle_name + "' matching \"" + rest + "\".");
		}
		it (
			step_statement, function() {
				bundle[step_key].apply(null, step_regex_result.slice(1).concat(other_step_parameters));
			}
		);
	},
	page: function(name) {
		return require(resolve_path(framework_config.pages_path, name + ".js"));
	}
};
