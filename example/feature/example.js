module.exports = {
	name: "Example feature.",
	scenarios: [
		{
			name: "Example scenario.",
			steps: [
				["example", "Log message", "[Example step parameter]"],
				["example", "Has element", "example", "login-button"],
				["example", "Fail"]
			]
		}
	]
};
