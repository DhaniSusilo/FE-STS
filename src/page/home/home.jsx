import { useState } from "react";
import RegistrationForm from "./form";
import LoginPopup from "./loginPopUp";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = (credentials) => {
    console.log("Login info:", credentials);
    // TODO: validate credentials, authenticate user...
    setIsLoginOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setIsLoginOpen(true)}
        className="login-button shadow"
      >
        Open Login
      </button>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      <RegistrationForm />
    </div>
  );
};

export default Home;
