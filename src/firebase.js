import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAjtkoBoXu43rFfoRB2MtLXcNbUoDL1BUo",
	authDomain: "lab-chat-78590.firebaseapp.com",
	projectId: "lab-chat-78590",
	storageBucket: "lab-chat-78590.appspot.com",
	messagingSenderId: "814343484593",
	appId: "1:814343484593:web:fc5601a29446bee4881e90",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
