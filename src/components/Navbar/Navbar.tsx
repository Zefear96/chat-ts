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

import { signOut } from "firebase/auth";
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

// function logout() {
// 	signOut(auth)
// 		.then(() => {
// 			console.log("success logout");
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// }

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
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//login
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName,
					}),
				);
			} else {
				dispatch(logout());
			}
		});
	}, [dispatch]);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
						LOGO
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
							{pages.map((page) =>
								user ? (
									<MenuItem key={page.path} onClick={handleCloseNavMenu}>
										<Typography
											textAlign="center"
											onClick={() => navigate(page.path)}
										>
											{page.type}
										</Typography>
									</MenuItem>
								) : null,
							)}
						</Menu>
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
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page.path}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page.type}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt="Remy Sharp"
									src={user ? user.photo : "/static/images/avatar/2.jpg"}
								/>
							</IconButton>
						</Tooltip>
						{user?.uid ? (
							<Menu
								sx={{ mt: "45px" }}
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
												onClick={() => signOut(auth)}
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
						) : (
							<>
								<Button
									onClick={() => navigate("/login")}
									style={{ color: "black" }}
								>
									Sign In
								</Button>
							</>
						)}
					</Box>
					{/* <Button onClick={() => logout()} style={{ color: "black" }}>
						Logout test
					</Button> */}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
