import { useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router";

import styles from "./Home.module.css";
import EventsList from "Components/Homepage/EventsList";
import TripsList from "Components/Homepage/TripsList";
import CurrentActions from "Components/Homepage/CurrentActions";
import { Broadcast } from "types/broadcast";
import { Trip } from "types/trip";
import HomeActions from "Components/Homepage/HomeActions";

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const logIn = useRouteLoaderData("root");
	const { events, trips } = useRouteLoaderData("root-home") as {
		events: Broadcast[];
		trips: Trip[];
	};

	useEffect(() => {
		!logIn && navigate("/");
	}, [logIn, navigate]);

	return (
		<div className={styles.home_page}>
			<div className={styles.home_actions}>
				<HomeActions />
			</div>
			<div className={styles.contents}>
				{/* <div className={styles.side_nav}></div> */}
				<div className={styles.contents_items}>
					<TripsList trips={trips} />
					<EventsList events={events} />
				</div>
				<div className={styles.current_actions}>
					<CurrentActions />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
