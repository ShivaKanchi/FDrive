import { Container } from "react-bootstrap";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <SignUp />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;

// import "./App.scss";
// import { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// import { auth } from "./firebase-config";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // setUser(auth.currentUser);
//     // console.log(user);
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       console.log(user);
//     });
//   }, [user]);

//   const signUpUser = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;
//       console.log("sign Up Done", user);
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   const signInUser = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await signInWithEmailAndPassword(auth, email, password);
//       setEmail("");
//       setPassword("");
//       console.log("sign in Done", user);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   const signOutUser = async (e) => {
//     e.preventDefault();
//     await signOut(auth);
//     console.log("Signout Done");
//     setEmail("");
//     setPassword("");
//   };
//   return (
//     <>
//       <section className="container">
//         <div className="card">
//           <h3>Sign Up</h3>
//           <input
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <button onClick={signUpUser}>Sign Up</button>
//         </div>

//         <div className="card">
//           <h3>Sign In</h3>
//           <input
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <button onClick={signInUser}>Sign In</button>
//         </div>

//         <div className="card">
//           <h4>User logged In: {user?.email ? user.email : "None"}</h4>
//           <button onClick={signOutUser}>Sign Out</button>
//         </div>
//       </section>
//     </>
//   );
// }

// export default App;
