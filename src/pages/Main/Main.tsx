import React from "react";
import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Profile from "../Profile/Profile";
import Telegram from "../Messenger/Messenger";
// import News from "../News/News";
import { Wrapper, Nav } from "./MainStyles";

const Main = () => {
	return (
		<Router>
			<Wrapper>
				<Nav>
					<NavLink to="/">
						<IconButton>
							<AccountCircleOutlinedIcon />
						</IconButton>
					</NavLink>
					<NavLink to="/messages">
						<IconButton>
							<EmailOutlinedIcon />
						</IconButton>
					</NavLink>
					<NavLink to="/news">
						<IconButton>
							<NewspaperOutlinedIcon />
						</IconButton>
					</NavLink>
				</Nav>
				<div>
					<Routes>
						<Route path="/" element={<Profile />} />
						<Route path="/messages" element={<Telegram />} />
						{/* <Route path='/news' element={<News />} /> */}
					</Routes>
				</div>
			</Wrapper>
		</Router>
	);
};

export default Main;
