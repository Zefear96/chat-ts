import React, { useState } from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import { auth, provider } from '../../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Wrapper, LoginTg, Buttons } from './LoginStyles';
import db from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import SignUpWithEmail from './SignUpWithEmail';
import SignInWithEmail from './SignInWithEmail';

const Login = () => {
  const [signUp, setSignUp ] = useState<number>(0);
  const signIn = () => {
    socialLogin();
  }

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

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: displayName,
      photoURL: 'https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg',
    }).then(() => {
      console.log(user);
    }).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
    }).catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  return (
    <Wrapper>
      <LoginTg>
        <div>
          <img src={img} alt='logo' />
          <h1>Telegram</h1>
        </div>
        {signUp === 0 ? null : signUp === 1 ? <SignUpWithEmail signUpWithEmail={signUpWithEmail}/> : signUp === 2 ? <SignInWithEmail signInWithEmail={signInWithEmail} /> : null}
      </LoginTg>
      <Buttons>
        {signUp === 0 ? 
        <>
          <Button onClick={() => setSignUp(1)}>Sign Up</Button>
          <Button onClick={() => setSignUp(2)}>
            Sign In With Email
            <EmailIcon />
          </Button>
        </> : signUp === 1 ? 
        <Button onClick={() => setSignUp(2)}>
          Sign In With Email
          <EmailIcon />
        </Button> : signUp === 2 ? 
        <Button onClick={() => setSignUp(1)}>Sign Up</Button> : null}
        <Button onClick={signIn}>
          <span>Sign In With Google</span>
          <GoogleIcon />
        </Button>
      </Buttons>
    </Wrapper>
  )
}

export default Login;

const img ='https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/768px-Telegram_logo.svg.png';