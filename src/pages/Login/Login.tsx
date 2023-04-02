import React, { useState } from "react";
import { Button } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
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
import { Wrapper, Buttons } from "./LoginStyles";
import db from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import SignUpWithEmail from "./SignUpWithEmail";
import SignInWithEmail from "./SignInWithEmail";
import SignInWithPhone from "./SignInWithPhone";

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
		navigate("/messages");
	};

	const navigate = useNavigate();
	return (
		<Wrapper>
			{signUp === 0 ? null : signUp === 1 ? (
				<SignUpWithEmail signUpWithEmail={signUpWithEmail} />
			) : signUp === 2 ? (
				<SignInWithEmail signInWithEmail={signInWithEmail} />
			) : null}

			<Buttons style={{ marginTop: "80px" }}>
				{signUp === 0 ? (
					<>
						<Button
							onClick={() => setSignUp(1)}
							sx={{ width: "100% !important", marginY: "10px" }}
							variant="contained"
						>
							Sign Up <PersonAddAltIcon />
						</Button>
						<Button
							onClick={() => setSignUp(2)}
							sx={{ width: "100% !important" }}
							variant="contained"
						>
							Sign In With Email
							<EmailIcon />
						</Button>
					</>
				) : signUp === 1 ? (
					<Button
						onClick={() => setSignUp(2)}
						sx={{ width: "100% !important", marginY: "10px" }}
						variant="contained"
					>
						Sign In With Email
						<EmailIcon />
					</Button>
				) : signUp === 2 ? (
					<Button
						onClick={() => setSignUp(1)}
						sx={{ width: "100% !important", marginY: "10px" }}
						variant="contained"
					>
						Sign Up
					</Button>
				) : null}

				<Button
					onClick={signIn}
					sx={{ width: "100% !important", marginY: "10px" }}
					variant="contained"
				>
					<span>Sign In With Google</span>
					<GoogleIcon />
				</Button>

				<Button
					onClick={() => navigate("/signphone")}
					sx={{ width: "100% !important", marginY: "10px" }}
					variant="contained"
				>
					<span>Sign In With Phone Number</span>
					<PermPhoneMsgIcon />
				</Button>
			</Buttons>
		</Wrapper>
	);
};

export default Login;
