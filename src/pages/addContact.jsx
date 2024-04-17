import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.jpeg";
import { logout } from "../libs/auth/logout";
import { useAuth } from "../context/auth-context";

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-10 px-14 rounded-lg">
        <p className="text-[#083F46] font-semibold text-[20px]">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#083F46] text-white rounded-full"
          >
            Okey
          </button>
        </div>
      </div>
    </div>
  );
};

const AddContact = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    pnomber: "",
    gender: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      console.log(response.data);

      setFormData({
        fullname: "",
        email: "",
        pnomber: "",
        gender: "",
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/contact");
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.3,
        }}
      ></div>
      <div className="w-full h-[120vh] -my-[50px] rounded-tr-[500px] rounded-bl-[500px] bg-[#083F46] relative z-10 pt-14">
        <div className="w-full grid grid-cols-[20%_80%]">
          <div></div>
          <div className="flex flex-col mt-20">
            <div>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="text-white pt-20">
              <h3 className="font-extrabold text-[50px]">New Contact</h3>
              <form onSubmit={handleSubmit}>
                <div className="pr-20 grid grid-cols-2 gap-8 pt-14 justify-center items-center">
                  <div>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-[400px] h-10 py-3 px-5 text-black rounded-full"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-[400px] h-10 py-3 px-5 text-black rounded-full"
                      placeholder="E-mail"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="pnomber"
                      value={formData.pnomber}
                      onChange={(e) => {
                        if (/^(\s*|\d+)$/.test(e.target.value)) {
                          setFormData((p) => ({
                            ...p,
                            pnomber: e.target.value,
                          }));
                        }
                      }}
                      required
                      className="w-[400px] h-10 py-3 px-5 text-black rounded-full"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="flex gap-28">
                    <label htmlFor="">Gender</label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        required
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        required
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>
                <button className="py-2 px-10 border border-white bg-transparent rounded-full mt-14">
                  Add Your First Contact
                </button>
              </form>
              {showSuccessModal && (
                <SuccessModal
                  message="Your contact has been saved successfully!"
                  onClose={handleCloseModal}
                />
              )}
              <div
                className="absolute 2xl:bottom-36 bottom-32 right-0 mr-20 mb-14 flex gap-2 cursor-pointer"
                onClick={() => logout(navigate, setAuth)}
              >
                <RiLogoutCircleLine size={30} />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
