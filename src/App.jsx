import "./App.css";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase-config";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // setUser(auth.currentUser);
    // console.log(user);
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(user);
    });
  }, []);

  const signUpUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("sign Up", user);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };
  const signInUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("sign in", user);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };
  const signOutUser = async () => {
    await signOut(auth);
    console.log("Signout");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <section className="container">
        <div className="card">
          <h3>Sign Up</h3>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={signUpUser}>Sign Up</button>
        </div>

        <div className="card">
          <h3>Sign In</h3>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={signInUser}>Sign In</button>
        </div>

        <div className="card">
          <h4>User logged In: {user?.email ? user.email : "None"}</h4>
          <button onClick={signOutUser}>Sign Out</button>
        </div>
      </section>
    </>
  );
}

export default App;
