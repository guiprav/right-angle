"use strict";
require('array.prototype.find');
var resolve_path = require("path").resolve;
var basename = require("path").basename;
var glob = require("glob");
var hbs = require("handlebars");
var framework_config = {};
var features = {};
var steps = {};
var current_run_context;
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
		glob.sync(resolve_path(framework_config.steps_path, "*.js")).forEach (
			function(bundle_file) {
				var bundle = require(resolve_path(bundle_file));
				var step_regex;
				var step;
				for(step_regex in bundle) {
					if(steps[step_regex] !== undefined) {
						throw new Error (
							"Step regular expression /" + step_regex + "/ is already defined "
							+ "(in bundle '" + steps[step_regex].bundle_file + "')"
						);
					}
					step = bundle[step_regex];
					step.bundle_file = basename(bundle_file);
					steps[step_regex] = step;
				}
			}
		);
		for(feature_name in features) {
			feature = features[feature_name];
			describe (
				"Feature: " + feature_name, function() {
					var scenario_name;
					var scenario;
					var scenario_run;
					var data;
					if(feature.beforeAll) {
						feature.beforeAll();
					}
					for(scenario_name in feature.scenarios) {
						scenario = feature.scenarios[scenario_name];
						if(typeof(scenario) === "function") {
							scenario_run = scenario;
						}
						else {
							scenario_run = scenario.run;
							if(typeof(scenario.data) === 'function') {
								data = scenario.data();
							}
							else {
								data = scenario.data;
							}
						}
						if(!Array.isArray(data)) {
							data = [data];
						}
						data.forEach (
							function(data) {
								var scenario_run_name;
								if(data) {
									scenario_run_name = hbs.compile(scenario_name)(data);
								}
								else {
									scenario_run_name = scenario_name;
								}
								current_run_context = data || {};
								describe (
									"Scenario: " + scenario_run_name, function() {
										if(feature.beforeEach) {
											feature.beforeEach.call(current_run_context);
										}
										scenario_run(data);
									}
								);
								current_run_context = null;
							}
						);
					}
				}
			);
		}
	},
	loadPage: function(name) {
		return require(resolve_path(framework_config.pages_path, name + ".js"));
	}
};
global.given = function() {
	return runStep.apply (
		null, ["Given"].concat([].slice.call(arguments, 0))
	);
};
global.and = function() {
	return runStep.apply (
		null, ["And"].concat([].slice.call(arguments, 0))
	);
};
global.when = function() {
	return runStep.apply (
		null, ["When"].concat([].slice.call(arguments, 0))
	);
};
global.then = function() {
	return runStep.apply (
		null, ["Then"].concat([].slice.call(arguments, 0))
	);
};
function runStep(prefix, statement) {
	var matching_step_keys;
	var step_key;
	var step_regex_result;
	var extra_step_parameters = [].slice.call(arguments, 2);
	var step;
	var step_fn;
	var jasmine_fn;
	if(current_run_context) {
		statement = hbs.compile(statement)(current_run_context);
	}
	matching_step_keys = Object.keys(steps).filter (
		function(step_regex) {
			var result = new RegExp("^" + step_regex + "$").exec(statement);
			if(result) {
				step_regex_result = result;
			}
			return !!result;
		}
	);
	switch(matching_step_keys.length) {
		case 0:
			throw new Error("No step matching \"" + statement + "\".");
		case 1:
			step_key = matching_step_keys[0];
			break;
		default:
			throw new Error (
				matching_step_keys.length + " steps match ambiguous statement \"" + statement + "\"."
			);
	}
	step = steps[step_key];
	if(step.composite) {
		jasmine_fn = describe;
		step_fn = step.run;
	}
	else {
		jasmine_fn = it;
		step_fn = step;
	}
	jasmine_fn (
		prefix + " " + statement, function() {
			step_fn.apply(current_run_context, step_regex_result.slice(1).concat(extra_step_parameters));
		}
	);
}
