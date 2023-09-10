import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import { auth } from "../config/firebase";
import TopNavBar from "./TopNavBar";
import PosesLibrary from "./PosesLibrary";
import MyFavourites from "./MyFavourites";
import PoseOfTheDay from "./PoseOfTheDay";

import "../styles/app.scss";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>YOGIPEDIA</h1>
        </header>
      </div>
      <TopNavBar />
      <Routes>
        <Route path="/login" element={<LoginModal onSetUser={setUser} />} />
        <Route
          path="/create-account"
          element={<SignUp onSetUser={setUser} />}
        />
        <Route path="/" element={<PoseOfTheDay />} />
        <Route path="/poses-library" element={<PosesLibrary />} />
        <Route path="/my-favourites" element={<MyFavourites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
