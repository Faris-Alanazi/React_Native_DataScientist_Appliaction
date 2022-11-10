import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import { getAuth } from "@react-native-firebase/auth";
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "fir-auth1-63c88.firebaseapp.com",
  projectId: "fir-auth1-63c88",
  storageBucket: "fir-auth1-63c88.appspot.com",
  messagingSenderId: "921392466791",
  appId: "1:921392466791:web:4f43d337ef335620267dc2"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

export { auth , app};
