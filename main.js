"use strict";
var resolve_path = require("path").resolve;
var glob = require("glob");
var features = {};
module.exports = {
	configure: function(config) {
		config.specs = config.specs || [];
		config.jasmineNodeOpts = config.jasmineNodeOpts || {};
		config.specs.push(__dirname + "/run-spec.js");
		if(config.jasmineNodeOpts.isVerbose === undefined) {
			config.jasmineNodeOpts.isVerbose = true;
		}
		return config;
	},
	run: function() {
		var feature_name;
		var feature;
		glob.sync("./feature/*.js").forEach (
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
					feature.before_all = parse_step_descriptors(feature.before_all || []);
					feature.before_each = parse_step_descriptors(feature.before_each || []);
					describe (
						"'Before all scenarios' steps:", function() {
							feature.before_all.forEach(execute_step);
						}
					);
					feature.scenarios.forEach (
						function(scenario) {
							describe (
								scenario.name, function() {
									describe (
										"'Before scenario' steps:", function() {
											feature.before_each.forEach(execute_step);
										}
									);
									describe (
										"Steps:", function() {
											scenario.steps = parse_step_descriptors(scenario.steps || []);
											scenario.steps.forEach(execute_step);
										}
									);
								}
							);
						}
					);
				}
			);
		}
	}
};
function parse_step_descriptors(step_descriptors) {
	return step_descriptors.map (
		function(step_descriptor) {
			var step = {};
			step.bundle = step_descriptor[0];
			step.name = step_descriptor[1];
			step.parameters = step_descriptor.slice(2);
			return step;
		}
	);
}
function execute_step(step) {
	var bundle = require(resolve_path("./step/" + step.bundle + ".js"));
	it (
		"[" + step.bundle + "] " + step.name, function() {
			bundle[step.name].apply(bundle, step.parameters);
		}
	);
}
