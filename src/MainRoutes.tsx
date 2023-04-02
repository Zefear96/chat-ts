import * as React from "react";

import { Routes, Route } from "react-router-dom";
import Messenger from "./pages/Messenger/Messenger";
import SignInWithPhone from "./pages/Login/SignInWithPhone";
import Login from "./pages/Login/Login";

const MainRoutes: React.FC = (): JSX.Element => {
	return (
		<Routes>
			{/* <Route path="/register" element={<RegisterPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/settings" element={<SettingsProfile />} /> */}
			<Route path="/messages" element={<Messenger />} />
			<Route path="/signphone" element={<SignInWithPhone />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default MainRoutes;
