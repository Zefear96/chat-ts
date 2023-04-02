import React, { useState } from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import { auth, provider } from "../../firebase";
import {
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { Wrapper, LoginTg, Buttons } from "./LoginStyles";
import db from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import SignUpWithEmail from "./SignUpWithEmail";
import SignInWithEmail from "./SignInWithEmail";
import SignInWithPhone from "./SignInWithPhone";

import {
	Tabs,
	Tab,
	Container,
	Box,
	Typography,
	TextField,
	Checkbox,
	// Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [signUp, setSignUp] = useState<number>(0);
	const signIn = () => {
		socialLogin();
	};

	const socialLogin = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			await setDoc(doc(db, "users", result.user.uid), {
				userID: result.user.uid,
				userName: result.user.displayName,
				userEmail: result.user.email,
				userFriends: [],
				userPhoto: result.user.photoURL,
			});
			console.log(result.user);
		} catch (error) {
			console.log(error);
		}
	};

	const signUpWithEmail = async (
		email: string,
		password: string,
		displayName: string,
	) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				updateProfile(user, {
					displayName: displayName,
					photoURL:
						"https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg",
				})
					.then(() => {
						console.log(user);
					})
					.catch((error) => {
						const errorMessage = error.message;
						console.log(errorMessage);
					});
			})
			.catch((error) => {
				// const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};

	const signInWithEmail = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				// const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};

	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const navigate = useNavigate();
	return (
		<Wrapper>
			<LoginTg>
				{signUp === 0 ? null : signUp === 1 ? (
					<SignUpWithEmail signUpWithEmail={signUpWithEmail} />
				) : signUp === 2 ? (
					<SignInWithEmail signInWithEmail={signInWithEmail} />
				) : null}
			</LoginTg>

			<Buttons>
				{signUp === 0 ? (
					<>
						<Button onClick={() => setSignUp(1)}>Sign Up</Button>
						<Button onClick={() => setSignUp(2)}>
							Sign In With Email
							<EmailIcon />
						</Button>
					</>
				) : signUp === 1 ? (
					<Button onClick={() => setSignUp(2)}>
						Sign In With Email
						<EmailIcon />
					</Button>
				) : signUp === 2 ? (
					<Button onClick={() => setSignUp(1)}>Sign Up</Button>
				) : null}
				<Button onClick={signIn}>
					<span>Sign In With Google</span>
					<GoogleIcon />
				</Button>
				<Button onClick={() => navigate("/signphone")}>
					<span>Sign In With Phone Number</span>
					<PermPhoneMsgIcon />
				</Button>
			</Buttons>
		</Wrapper>

		// <Container maxWidth="sm" sx={{ mt: 3 }}>
		// 	<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
		// 		<Tabs
		// 			value={activeTab}
		// 			onChange={handleTabChange}
		// 			centered
		// 			indicatorColor="primary"
		// 			textColor="primary"
		// 		>
		// 			<Tab label="Login" onClick={() => navigate("/login")} />
		// 			<Tab label="Register" onClick={() => navigate("/register")} />
		// 		</Tabs>
		// 	</Box>
		// 	{activeTab === 0 && (
		// 		<Box component="form" sx={{ mb: 3 }}>
		// 			<TextField
		// 				label="Email address"
		// 				variant="outlined"
		// 				fullWidth
		// 				margin="normal"
		// 				autoFocus
		// 				required
		// 			/>
		// 			<TextField
		// 				label="Password"
		// 				variant="outlined"
		// 				fullWidth
		// 				margin="normal"
		// 				type="password"
		// 				required
		// 			/>
		// 			<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
		// 				<Checkbox defaultChecked />
		// 				<Typography variant="body2">Remember me</Typography>
		// 			</Box>
		// 			<Button variant="contained" fullWidth>
		// 				Sign in
		// 			</Button>
		// 			<Button
		// 				variant="contained"
		// 				fullWidth
		// 				onClick={signIn}
		// 				color="success"
		// 			>
		// 				Sign in with Google
		// 			</Button>

		// 			<Button variant="contained" fullWidth onClick={signIn}>
		// 				Sign in with Phone Number
		// 			</Button>

		// 			<Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
		// 				Not a member?{" "}
		// 				<a
		// 					onClick={() => navigate("/register")}
		// 					style={{ cursor: "pointer", textDecoration: "underline" }}
		// 				>
		// 					Register
		// 				</a>
		// 			</Typography>
		// 		</Box>
		// 	)}
		// 	{activeTab === 1 && (
		// 		<Box component="form" sx={{ mb: 3 }}>
		// 			<Typography variant="h6" sx={{ mb: 3 }}>
		// 				Sign up with:
		// 			</Typography>
		// 			<TextField
		// 				label="Username"
		// 				variant="outlined"
		// 				fullWidth
		// 				margin="normal"
		// 				autoFocus
		// 				required
		// 			/>
		// 			<TextField
		// 				label="Email"
		// 				variant="outlined"
		// 				fullWidth
		// 				margin="normal"
		// 				required
		// 			/>
		// 			<TextField
		// 				label="Password"
		// 				variant="outlined"
		// 				fullWidth
		// 				margin="normal"
		// 				type="password"
		// 				required
		// 			/>
		// 			<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
		// 				<Checkbox defaultChecked />
		// 				<Typography variant="body2">
		// 					I have read and agree to the terms
		// 				</Typography>
		// 			</Box>
		// 			<Button variant="contained" fullWidth onClick={() => setSignUp(1)}>
		// 				Sign up
		// 			</Button>
		// 		</Box>
		// 	)}
		// </Container>
	);
};

export default Login;
