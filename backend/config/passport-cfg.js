const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");

const User = require("../models/user");
const bcrypt = require("bcrypt");
const keys = require("./keys");

module.exports = function (app, passport) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(
		new LocalStrategy(
			// we don't have to do password
			// since it defaults to "password" as well
			{
				usernameField: "email",
				passwordField: "password",
			},
			// this is to authenticate users
			async (email, password, done) => {
				const user = await User.findOne({ email: email });
				if (user === null) {
					return done(null, false, {
						message: "Could not find user with this email!",
					});
				}
				try {
					if (await bcrypt.compare(password, user.password)) {
						return done(null, user);
					} else {
						return done(null, false, { message: "Password incorrect!" });
					}
				} catch (e) {
					return done(e);
				}
			}
		)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: keys.google.clientID,
				clientSecret: keys.google.clientSecret,
				callbackURL: "/auth/google/redirect",
			},
			() => {}
		)
	);

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		User.findById(id).then((user) => {
			const userInfo = {
				id: user.id,
				email: user.email,
			};
			done(null, userInfo);
		});
	});
};
