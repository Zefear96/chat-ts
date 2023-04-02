import React, {ChangeEvent} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { selectUser } from "../../features/userSlice";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { IconButton } from "@mui/material";
import { updateProfile, updateEmail } from "firebase/auth";
import { getAuth, onAuthStateChanged, reauthenticateWithCredential } from "firebase/auth";

import { auth } from "../../firebase";
// import { Wrapper, Header, Photo, Container } from "./ProfileStyles";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles';


import './ProfileStyles.css'
// import FriendsList from '../../components/FriendsList/FriendsList';

const Profile = () => {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	let editedUser: any = {}

	//modal
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const theme = createTheme({
		palette: {
		  mode: 'dark',
		  primary: {
			main: '#1976d2',
		  },
		},
	});

	function handleInp(e: React.ChangeEvent<HTMLInputElement>) {

		let obj = {
			...user,
			[e.target.name]: e.target.value,
		};

		editedUser = obj
		console.log(editedUser);
		console.log(user);
		
	}

	async function saveUpdates () {

		onAuthStateChanged(auth, (user) => {
			if (user) {
			  // User is signed in, see docs for a list of available properties
			  // https://firebase.google.com/docs/reference/js/firebase.User
			  const uid = user.uid;
			//   const credential = promptForCredentials();

			// reauthenticateWithCredential(user, credential).then(() => {
  			// // User re-authenticated.
			// 	}).catch((error) => {
  			// 		// An error ocurred
  			// 		// ...
			// 	});
			  	
			 updateProfile(user, {
				displayName: editedUser.username, photoURL: editedUser.photo
			  }).then(() => {
				console.log('profile updated');
				
			  }).catch((error) => {
				console.log(error);
				
			  });

			updateEmail(user, editedUser.email).then(() => {
				console.log('email updated');
	
			  }).catch((error) => {
				console.log(error);
				
			  });
			  // ...
			} else {
			  // User is signed out
			  // ...
			}
		  });
	  }

	return user? (
		<div className='profile-container'>
		<div className='profile-block'>
		<Card className='profile-main'>
	      <Avatar   sx={{ height: '100px', width: '100px', m: 'auto'}} alt={`${user}`} src={user.photo ? user.photo : img} />
	<CardContent>
	  <Typography gutterBottom variant="h5" component="div" textAlign='center'>
	   {user.displayName}
	  </Typography>
	  <Typography variant="body2" color="text.secondary" textAlign='center'>
	   Email: {user.email} 
	  </Typography>
	</CardContent>
	<CardActions className='btn-block'>
	  <Button size="small" sx={{color:'#4193FF !important'}} onClick={handleOpen}>
		<EditIcon sx={{m: '0 5px'}} />
		Edit Profile Info
	  </Button>
	  <Button size="small" sx={{color:'#4193FF !important'}} onClick={() => navigate('/chat')}>
		<EmailIcon sx={{m: '0 5px'}}/>
		Messages
	  </Button>
	</CardActions>
	</Card>
	{/* Modal */}
     <ThemeProvider theme={theme}>
	<Modal
        open={open}
        onClose={handleClose}
      >
        <Box  className='edit-mod'>
          <Typography variant="h6" component="h2" style={{textAlign: 'center', color: 'aliceblue', marginTop: '15px', marginBottom: '10px'}}>
			Edit information          
			</Typography>
			<div className="edit-inputs">
			<TextField
    			variant="outlined"
                  label="Email (only if you have just logged in!)"
                  placeholder="Enter email"
				  sx={{         "& .MuiInputBase-root": {
					color: '#1976d2 !important'
				}, mb: "10px", 
				"& .MuiOutlinedInput-root": {
					"&.Mui-focused fieldset": {
					  borderColor: "yellow	"
					}
				  }}}
                  fullWidth
                 color="primary"
                  onChange={handleInp}
				  defaultValue={user.email}
				  name='email'
                >
		</TextField>
            <TextField
                  variant="outlined"
                  label="Username"
                  placeholder="Enter username"
                //   color="secondary"
                  // value={error ? error.password : null}
                  fullWidth
				  sx={{         "& .MuiInputBase-root": {
					color: '#1976d2 !important'
				}, mb: "10px", 
				"& .MuiOutlinedInput-root": {
					"&.Mui-focused fieldset": {
					  borderColor: "yellow	"
					}
				  }}}
                  
				  defaultValue={user.displayName}
                  onChange={handleInp}
				  name='username'
                >
			</TextField>
			<TextField
                  variant="outlined"
                  label="Photo URL"
                  placeholder="Enter photo URL"
                  
                  // value={error ? error.password2 : null}
                  fullWidth
				  sx={{         "& .MuiInputBase-root": {
					color: '#1976d2 !important'
				}, mb: "10px", 
				"& .MuiOutlinedInput-root": {
					"&.Mui-focused fieldset": {
					  borderColor: "yellow	"
					}
				  }}}
				  defaultValue={user.photo}
                  onChange={handleInp}
				  name='photo'
                >
			</TextField>
			<Button variant="contained" sx={{backgroundColor: '#1976d2', color: 'aliceblue'}} onClick={() => saveUpdates()}>Save changes</Button>
			</div>
        </Box>
    </Modal>
	</ThemeProvider>
		</div>
	</div>
	  ) : (
		<h1>You haven't logged in</h1>
	  )
};

export default Profile;

const img =
	"https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg";

// 	<Wrapper>
// 	<Container>
// 		<Header>
// 			<Photo src={user.photo ? user.photo : img} alt="user" />
// 			<div>
// 				<h2>{user.displayName}</h2>
// 				<h3>Email: {user.email}</h3>
// 			</div>
// 			{/* <IconButton onClick={() => signOut(auth)}>
// 				<LogoutOutlinedIcon />
// 			</IconButton> */}
// 		</Header>
// 		{/* <FriendsList /> */}
// 	</Container>
// </Wrapper>