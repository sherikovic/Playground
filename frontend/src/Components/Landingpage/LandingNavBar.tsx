import { useState } from "react";
import {
	Link,
	NavLink,
	useLocation,
	useRouteLoaderData,
} from "react-router-dom";

import styles from "./LandingNavBar.module.css";
import LoginForm from "../Auth/LoginForm";

import { authUser } from "util/api";

import logo from "../../images/logo.svg";
import { LogoLink, LogoWhite } from "util/common_styles";

const LandingNavigation: React.FC = () => {
	const [showLoginOverlay, setShowLoginOverlay] = useState(false);
	const location = useLocation();
	const logIn = useRouteLoaderData("root");

	const logOutHandler = async () => {
		const res = await authUser("logout", null);
		res.status === 200 && window.location.reload();
		// TODO handle errors coming from the logout
	};

	return (
		<div className={styles.landing_navigation}>
			<LogoLink href="/">
				<LogoWhite src={logo} />
			</LogoLink>
			<nav className={styles.landing_nav_container}>
				<NavLink
					to="about"
					state={{ from: location.pathname }}
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					About
				</NavLink>
				<NavLink
					to="how-to-use"
					state={{ from: location.pathname }}
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					How to Use
				</NavLink>
				<NavLink
					to="faq"
					state={{ from: location.pathname }}
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					FAQ
				</NavLink>
				<NavLink
					to="contact"
					state={{ from: location.pathname }}
					className={({ isActive }) => (isActive ? styles.active : undefined)}
				>
					Contact
				</NavLink>
			</nav>
			{logIn ? (
				<nav className={styles.landing_login}>
					<button onClick={logOutHandler}>Log out</button>
				</nav>
			) : (
				<nav className={styles.landing_login}>
					<button onClick={() => setShowLoginOverlay(true)}>Log in</button>
					<Link to="signup" state={{ from: location.pathname }}>
						Sign up
					</Link>
				</nav>
			)}
			{showLoginOverlay && (
				<div className={styles.card_overlay}>
					<div className={styles.overlay_content}>
						<LoginForm
							cancelHandler={() => setShowLoginOverlay(false)}
							from={location.pathname}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default LandingNavigation;
