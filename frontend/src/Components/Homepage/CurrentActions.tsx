import { useEffect, useState } from "react";
import { Broadcast } from "types/broadcast";
import { Trip } from "types/trip";
import { getUser, getUserEvents, getUserTrips } from "util/api";
import { useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import { FlexboxCol } from "util/common_styles";

const CurrentActions: React.FC = () => {
	const [activeState, setActiveState] = useState("events");
	const [events, setEvents] = useState<{ objects: Broadcast }>();
	const [trips, setTrips] = useState<{ objects: Trip }>();
	const logIn = useRouteLoaderData("root") as boolean;

	useEffect(() => {
		async function runThis() {
			const response = await getUser();
			if (response.getJson.user) {
				setEvents(await getUserEvents(response.getJson.user.email));
				setTrips(await getUserTrips(response.getJson.user.email));
			}
		}
		logIn && runThis();
	}, [logIn]);

	return (
		<FlexboxCol style={{ minHeight: "250px" }}>
			<CurrentActionsHeader $activeState={activeState}>
				<span onClick={() => setActiveState("events")}>Current Events</span>
				<span onClick={() => setActiveState("trips")}>My Trips</span>
			</CurrentActionsHeader>
			{/* {logIn && activeState === "events" && events && (
				<FlexboxCol style={{margin: "20px 30px 0px 30px"}}>{events?.objects[2].name}</FlexboxCol>
			)}
			{logIn && activeState === "trips" && trips && (
				<FlexboxCol style={{margin: "20px 30px 0px 30px"}}>{trips?.objects[2].name}</FlexboxCol>
			)} */}
			{!logIn && <div>Couldn't load information</div>}
		</FlexboxCol>
	);
};

export default CurrentActions;

const CurrentActionsHeader = styled.div<{ $activeState }>`
	display: flex;
	margin: 10px 30px 0 30px;
	border-bottom: 1px solid #c2c2d1;
	height: 3vw;
	align-items: center;
	gap: 10px;
	> span {
		text-align: center;
		min-width: 170px;
		font-size: 15px;
		font-weight: 550;
		cursor: pointer;
		&:hover {
			color: black;
			transition: 0.2s ease-in-out;
		}
		&:first-child {
			color: ${(p) => (p.$activeState === "events" ? "black" : "grey")};
			transition: ${(p) => p.$activeState === "events" && "0.2s ease-in-out"};
			padding-right: 10px;
		}
		&:last-child {
			color: ${(p) => (p.$activeState === "trips" ? "black" : "grey")};
			transition: ${(p) => p.$activeState === "events" && "0.2s ease-in-out"};
		}
	}
`;
