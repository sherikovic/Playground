const session = require("express-session");
const bodyParser = require("body-parser");
const PORT = process.env.MODE === "dev" ? 8080 : process.env.PORT;

module.exports = (app) => {
	app.use(bodyParser.json());

	app.use((req, res, next) => {
		process.env.MODE === "dev"
			? res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
			: res.setHeader("Access-Control-Allow-Origin", "https://roamies.org");
		res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		next();
	});

	app.options("*", (req, res) => {
		process.env.MODE === "dev"
			? res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
			: res.setHeader("Access-Control-Allow-Origin", "https://roamies.org");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
		res.status(200).send();
	});

	app.use(
		session({
			secret: "thisisasecret",
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				expires: 1000 * 60 * 60 * 24 * 1,
			},
		})
	);

	app.listen(PORT, () => {
		console.log("Serving on Port " + PORT);
	});
};
