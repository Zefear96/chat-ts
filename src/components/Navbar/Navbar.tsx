import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { selectUser, login, logout } from "../../features/userSlice";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const pages = [
	{
		type: "Chat Rooms",
		path: "/messages",
	},
];

const settings = [
	{
		type: "Account",
		path: "/profile",
	},
	{
		type: "Logout",
		path: "/logout",
	},
];

function Navbar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null,
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// custom
	const navigate = useNavigate();
	const user = useSelector(selectUser);

	const dispatch = useDispatch();

	useEffect(() => {
		getAuth();
	}, []);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<img
						src="https://camo.githubusercontent.com/2f1065f3cc62c661aa1ff2eba71bcbc876a11be3ebc6ee4e06015aa565c0ba14/68747470733a2f2f63646e2e69636f6e73636f75742e636f6d2f69636f6e2f7072656d69756d2f706e672d3531322d7468756d622f6f70656e61692d313532333636342d313239303230322e706e67"
						alt="error"
						width="30px"
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={() => navigate("/")}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						ChatMak
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>

						{user ? (
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page.path} onClick={handleCloseNavMenu}>
										<Typography
											textAlign="center"
											onClick={() => navigate(page.path)}
										>
											{page.type}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						) : null}
					</Box>

					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						ChatMak
					</Typography>

					{user ? (
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page.path}
									// onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}
									onClick={() => navigate(page.path)}
								>
									{page.type}
								</Button>
							))}
						</Box>
					) : null}

					<Box sx={{ flexGrow: 0 }}>
						{user ? (
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt="Remy Sharp"
										src={user ? user.photo : "/static/images/avatar/2.jpg"}
									/>
								</IconButton>
							</Tooltip>
						) : null}

						{user ? (
							<Menu
								sx={{
									mt: "45px",
									"& .MuiPaper-root": {
										backgroundColor: "#4193FF",
									},
								}}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) =>
									setting.type === "Logout" ? (
										<MenuItem key={setting.path} onClick={handleCloseUserMenu}>
											<Typography
												textAlign="center"
												onClick={() => {
													signOut(auth);
													setTimeout(() => {
														navigate("/login");
													}, 500);
												}}
											>
												Logout
											</Typography>
										</MenuItem>
									) : (
										<MenuItem key={setting.path} onClick={handleCloseUserMenu}>
											<Typography
												textAlign="center"
												onClick={() => navigate(setting.path)}
											>
												{setting.type}
											</Typography>
										</MenuItem>
									),
								)}
							</Menu>
						) : null}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
