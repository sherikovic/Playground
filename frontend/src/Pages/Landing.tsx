import { useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router";

import styles from "./Landing.module.css";
import LoginForm from "Components/Auth/LoginForm";
import { CardOverlay, LogoLink, OverlayContent } from "util/common_styles";
import logo from "../images/logo.svg";
import styled from "styled-components";

const LandingPage: React.FC = () => {
	const navigate = useNavigate();
	const [showLoginPage, setShowLoginPage] = useState(false);
	const logIn = useRouteLoaderData("root");

	useEffect(() => {
		logIn && navigate("/home");
	}, [logIn, navigate]);

	return (
		<div className={styles.landing_page}>
			<div className={styles.background_image}></div>
			<div className={styles.landing_navigation}>
				<LogoLink href="/">
					<LogoWhite src={logo} />
				</LogoLink>
				<nav className={styles.landing_nav_container}>
					<a href="/about">About</a>
					<a href="/how-to-use">How to Use</a>
					<a href="/faq">FAQ</a>
					<a href="/contact">Contact</a>
				</nav>
				<nav className={styles.landing_login}>
					<button onClick={() => setShowLoginPage(true)}>Log in</button>
				</nav>
			</div>
			<div className={styles.main_text}>
				<p>It's better, together!</p>
				<p>From solo traverels, for solo traverels.</p>
			</div>
			<div className={styles.join_link}>
				<a href="/signup">Join the Community</a>
			</div>
			{showLoginPage && (
				<CardOverlay>
					<OverlayContent>
						<LoginForm cancelHandler={() => setShowLoginPage(false)} />
					</OverlayContent>
				</CardOverlay>
			)}
		</div>
	);
};

export default LandingPage;

const LogoWhite = styled.img`
	max-width: 80px;
`;
