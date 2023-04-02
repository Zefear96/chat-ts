import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Wrapper, Header, Photo, Container } from "./ProfileStyles";
// import FriendsList from '../../components/FriendsList/FriendsList';

const Profile = () => {
	const user = useSelector(selectUser);

	return (
		<Wrapper>
			<Container>
				<Header>
					<Photo src={user.photo ? user.photo : img} alt="user" />
					<div>
						<h2>{user.displayName}</h2>
						<h3>Email: {user.email}</h3>
					</div>
					{/* <IconButton onClick={() => signOut(auth)}>
						<LogoutOutlinedIcon />
					</IconButton> */}
				</Header>
				{/* <FriendsList /> */}
			</Container>
		</Wrapper>
	);
};

export default Profile;

const img =
	"https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg";
