import {Container} from "react-bootstrap";
import styles from "./styles/NotePage.module.css";

import Navbar from "./components/Navbar.tsx";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView.tsx";
import { useEffect, useState } from "react";
import { User } from "./types/user.ts";
import api from "./hooks/axios/api.ts";
import Signup from "./pages/user/Signup.tsx";
import LoggedOutViewPage from "./components/LoggedOutViewPage.tsx";
import Login from "./pages/user/Login.tsx";

function App() {

  const [loggedInUser,setLoggedInUser]=useState<User | null>(null);

  const [showSignUpModal,setShowSignupModal]=useState(false);
  const [showLoginModal,setShowLoginModal]=useState(false);


  useEffect(()=>{
    async function fetchLoggedInUser() {
      try {
          const response = await api.get(`/api/user/`);
          setLoggedInUser(response.data); 
      } catch (error) {
        console.error(error);
      }
    }

    fetchLoggedInUser();
  },[])

  return (
    <>
      <Navbar
        LoggedInUser={loggedInUser}
        onLogOutSuccessful={() => {setLoggedInUser(null)}}
        onLoginClicked={() => {setShowLoginModal(true)}}
        onSignUpClicked={() => {setShowSignupModal(true)}}
      />
      <Container className={styles.notePage}>
       {
        loggedInUser ?  <NotesPageLoggedInView/> :
        <LoggedOutViewPage/>
       }

      </Container>
        {showSignUpModal && <Signup onDismiss={() => {setShowSignupModal(false)}} onSignUpSuccessful={(user) => {
          setLoggedInUser(user);
          setShowSignupModal(false);
        }} />}
        {showLoginModal && <Login onDismiss={() => {setShowLoginModal(false)}} onLoginSuccessful={(user) => {
           setLoggedInUser(user);
           setShowLoginModal(false);
        }} />}
    </>
  );
}

export default App;
