import React from "react";
import { Outlet } from "react-router-dom";

import LandingNavigation from "Components/Landingpage/LandingNavBar";

const RootLanding: React.FC = () => {
	return (
		<>
			<LandingNavigation />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLanding;
