import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Login = ({ toggle }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useAuth();

  const submit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Login successful
        setAuth(data.user);
        localStorage.setItem("twc-auth", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server Error");
    }
  };
  return (
    <div className="bg-[#083F46] h-screen flex pl-10 items-center">
      <div className="pl-10 flex flex-col gap-8">
        <div className="text-white">
          <h3 className="font-extrabold text-[50px]">Hi there,</h3>
          <p className="text-[35px] font-normal leading-10 ">
            Welcome to our <br />
            contacts portal
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] py-2 px-5 rounded-full"
            placeholder="Email"
            value={email}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] py-2 px-5 rounded-full"
            placeholder="Password"
            value={password}
          />
        </div>
        <div className="flex flex-col gap-5  text-white">
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex  items-center gap-5">
            <button
              onClick={submit}
              className="py-1 px-10 border border-white text-white rounded-full w-[150px] text-[25px]"
            >
              Login
            </button>
            <p className="text-[25px]">or</p>
            <p
              onClick={toggle}
              className="cursor-pointer text-white underline text-[25px]"
            >
              Click here to Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
