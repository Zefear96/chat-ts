import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
// import { IconButton } from "@mui/material";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Profile from "../Profile/Profile";
import Telegram from "../Messenger/Messenger";
// import News from "../News/News";
// import { Wrapper, Nav } from "./MainStyles";
import Navbar from "../../components/Navbar/Navbar";
import SignInWithPhone from "../Login/SignInWithPhone";
import Login from "../Login/Login";

const Main = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/profile" element={<Profile />} />
				<Route path="/messages" element={<Telegram />} />
				<Route path="/signphone" element={<SignInWithPhone />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default Main;
