import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { LiaLessThanSolid } from "react-icons/lia";

const Register = ({ toggle }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setAuth(data.user);
        await localStorage.setItem("twc-auth", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Registration failed");
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
          <h3 className="font-extrabold text-[50px]">Register Now!</h3>
        </div>
        <div className="flex flex-col gap-8">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] py-2 px-5 rounded-full "
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] py-2 px-5 rounded-full"
            placeholder="Password"
          />
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[400px] py-2 px-5 rounded-full"
            placeholder="Confirm Password"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-5   text-white">
          <button
            onClick={submit}
            className=" border border-white text-white rounded-full w-[149px] text-[25px]  "
          >
            register
          </button>
          <div className="flex  items-center gap-3 underline pt-14">
            <LiaLessThanSolid />

            <p onClick={toggle} className="cursor-pointer text-white">
              Back to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
