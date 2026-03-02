import './App.css'
import {useLocation} from "react-router-dom"
import Navbar from './components/Navbar'
import {useState } from 'react'
import LoginPopup from './components/authforms/LoginPopup'
import SignupPopup from './components/authforms/SignupPopup'
import Modal from './components/Modal'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from './routes/appRoutes'
import ForgotPasswordPopup from './components/authforms/ForgotPasswordPopup'  





function App() {

  const location = useLocation();
  const hideNavbarOn = ["/report-item"]; //navs where navbar should be hidden 
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);



  return (

    <>
       <ToastContainer />
       
        {showNavbar &&
          <Navbar
            openLogin = {() => setShowLogin(true)}
            openSignup = {() => setShowSignup(true)}
          />
        }


        {
          //showing login popup if login button is clicked
          showLogin && (
            <Modal onClose={() => setShowLogin(false)}>
                <LoginPopup
                  close={() => setShowLogin(false)}
                  openSignup={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                  }}
                  openForgotPassword={() => {      
                        setShowLogin(false);
                        setShowForgotPassword(true);
                  }}
                />
            </Modal>
          )
        }

        {
          //showing signup popup if signup button is clicked
          showSignup && (
            <Modal onClose={() => setShowSignup(false)}>
              <SignupPopup
                close={() => setShowSignup(false)}
                openLogin={() => {
                  setShowLogin(true);
                  setShowSignup(false);
                }}
              />
            </Modal>
          )
        }

        {showForgotPassword && (
              <Modal onClose={() => setShowForgotPassword(false)}>
                  <ForgotPasswordPopup
                      close={() => setShowForgotPassword(false)}
                      openLogin={() => {
                          setShowForgotPassword(false);
                          setShowLogin(true);
                      }}
                  />
              </Modal>
          )}


          <AppRoutes
           openSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
          }}/>
    

    
    </>
    
  )
}

export default App;
