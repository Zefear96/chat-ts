import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

// import "../styles/RegisterPage.css";

import {
	Tabs,
	Tab,
	Container,
	Box,
	Typography,
	TextField,
	Checkbox,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

declare global {
	interface Window {
		recaptchaVerifier: any;
		confirmationResult: any;
	}
}

export interface IUser {
	phoneNumber: string;
}

const SignInWithPhone = (): JSX.Element => {
	const [otp, setOtp]: any = useState("");
	const [ph, setPh]: any = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const [showOTP, setShowOTP] = useState<boolean>(false);
	const [user, setUser] = useState<IUser>({
		phoneNumber: "",
	} as IUser);
	const [agree, setAgree]: any = useState(false);

	function onCaptchVerify() {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(
				"recaptcha-container",
				{
					size: "normal",
					callback: (response: any) => {
						onSignup();
					},
					"expired-callback": () => {},
				},
				auth,
			);
		}
	}

	const onSignup = () => {
		setLoading(true);

		if (!agree) {
			alert("You need to agree to our Policy");
			return;
		}

		onCaptchVerify();

		const appVerifier = window.recaptchaVerifier;

		const formatPh = "+" + ph;

		signInWithPhoneNumber(auth, formatPh, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setLoading(false);
				setShowOTP(true);
				toast.success("OTP sended successfully!");
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const onOTPVerify = (): void => {

		setLoading(true);
		window.confirmationResult
			.confirm(otp)
			.then(async (res: any) => {
				console.log(res);
				setUser(res.user);
				setLoading(false);
			})
			.catch((err: any) => {
				console.log(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		console.log(user);
	}, []);

	// MUI
	const [activeTab, setActiveTab] = useState(1);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const navigate = useNavigate();

	return (
		<section className="bg-emerald-500 flex items-center justify-center h-screen">
			<div>
				<Toaster toastOptions={{ duration: 4000 }} />
				<div id="recaptcha-container"></div>
				{user.phoneNumber ? (
					<h2 className="text-center text-white font-medium text-2xl">
						👍Login Success
					</h2>
				) : (
					<div className="w-80 flex flex-col gap-4 rounded-lg p-4">
						{showOTP ? (
							<div className="verif-container">
								<div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
									<BsFillShieldLockFill
										size={30}
										style={{ color: "#2196f3" }}
									/>
								</div>
								<label
									htmlFor="otp"
									className="font-bold text-xl text-white text-center"
								>
									Enter your OTP
								</label>
								<OtpInput
									value={otp}
									onChange={setOtp}
									OTPLength={6}
									otpType="number"
									disabled={false}
									autoFocus
									className="opt-container"
								></OtpInput>

								<Button
									variant="contained"
									fullWidth
									onClick={onOTPVerify}
									style={{ width: "280px", margin: "15px" }}
								>
									{loading && (
										<CgSpinner size={20} className="mt-1 animate-spin" />
									)}
									Verify OTP
								</Button>
							</div>
						) : (
							<>
								<Container maxWidth="sm" sx={{ mt: 3 }}>
									{/* <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
										<Tabs
											value={activeTab}
											onChange={handleTabChange}
											centered
											indicatorColor="primary"
											textColor="primary"
										>
											<Tab label="Login" onClick={() => navigate("/login")} />
											<Tab
												label="Register"
												onClick={() => navigate("/register")}
											/>
										</Tabs>
									</Box> */}

									<Box component="form" sx={{ mb: 3 }}>
										<Typography
											variant="body2"
											sx={{ display: "flex", alignItems: "center", my: 2 }}
										>
											Sign Up your phone number
										</Typography>

										<PhoneInput
											country={"kg"}
											value={ph}
											onChange={setPh}
											inputClass="inp-phone"
										/>

										<Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
											<Checkbox
												onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
													setAgree(e.target.checked)
												}
											/>
											<Typography variant="body2">
												I have read and agree to the terms
											</Typography>
										</Box>

										<Button variant="contained" fullWidth onClick={onSignup}>
											{loading && (
												<CgSpinner size={20} className="mt-1 animate-spin" />
											)}
											Sign up
										</Button>
									</Box>
								</Container>
							</>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default SignInWithPhone;
