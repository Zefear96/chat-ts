import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Header, Threads, Footer } from "./SidebarStyles";
import { Avatar, IconButton, Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SidebarThread from "../SidebarThread";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { SidebarThreads } from "./interfaces";

const Sidebar = () => {
	const user = useSelector(selectUser);
	const [threads, setThreads] = useState<Array<object>>([]);

	useEffect(() => {
		onSnapshot(collection(db, "threads"), (snapshot) =>
			setThreads(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				})),
			),
		);
	}, []);

	const addThread = async () => {
		const threadName = prompt("Enter a thread name.");
		if (threadName) {
			await addDoc(collection(db, "threads"), {
				threadName: threadName,
				img: user.photo,
			});
		}
	};

	return (
		<Wrapper>
			<Header>
				All rooms
			</Header>
			<Threads>
				{threads.map(
					({ id, data: { threadName, img } }: SidebarThreads): JSX.Element => (
						<SidebarThread key={id} id={id} threadName={threadName} img={img} />
					),
				)}
			</Threads>
			<Footer>
				<Avatar src={user?.photo} />
				<Button variant="contained"
				sx={{ backgroundColor: "#1976d2", color: "aliceblue" }} onClick={addThread}>
					<AddCircleOutlineIcon sx={{color: 'white', marginRight: '5px'}}/>Add New Room</Button>
			</Footer>
		</Wrapper>
	);
};

export default Sidebar;
