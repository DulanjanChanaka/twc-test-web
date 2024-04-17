import { useState } from "react";
import BackgroundImage from "../assets/background.jpeg";
import logo2 from "../assets/logo2.png";
import Register from "./register";
import Login from "./login";

const MainLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register

  const toggle = () => {
    setIsRegistering(!isRegistering); // Toggle the state between true and false
  };
  return (
    <div className="grid grid-cols-[60%_40%]">
      <div className="h-screen overflow-hidden">
        <div className="bg-[#083F46] rounded-r-full -my-[330px] h-[190vh] flex  items-center justify-center">
          <div className=" flex flex-col gap-8  -mt-32">
            {isRegistering ? (
              <Register toggle={toggle} />
            ) : (
              <Login toggle={toggle} />
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            opacity: 0.3,
          }}
          className="relative -z-10 -ml-[117px] "
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logo2}
            alt="logo"
            className="h-auto max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
