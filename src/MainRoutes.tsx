import * as React from "react";

import { Routes, Route } from "react-router-dom";
import Messenger from "./pages/Messenger/Messenger";
import SignInWithPhone from "./pages/Login/SignInWithPhone";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import HomePage from "./pages/HomePage/HomePage";

const MainRoutes: React.FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/messages" element={<Messenger />} />
			<Route path="/signphone" element={<SignInWithPhone />} />
			<Route path="/login" element={<Login />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/" element={<HomePage />} />
		</Routes>
	);
};

export default MainRoutes;
