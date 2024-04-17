import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.jpeg";
import logo from "../assets/logo.png";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../context/auth-context";
import { logout } from "../libs/auth/logout";

const Home = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  return (
    <div className="w-full h-screen overflow-hidden relative  ">
      <div style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3, 
      }}>
      </div>
      <div className="w-full h-[120vh] -my-[50px] rounded-tr-[500px] rounded-bl-[500px] bg-[#083F46] relative z-10  pt-14">
        <div className="w-full grid grid-cols-[20%_80%]">
          <div></div>
          <div className="flex flex-col mt-20">
            <div>
              <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <div className="text-white pt-20">
              <h3 className="font-extrabold text-[50px]">Welcome,</h3>
              <p className="text-[35px]">
                This is where your contacts will live. Click the button below <br />to add a new contact.</p>
              <Link to="contact/new"><button className="py-2 px-10 border border-white bg-transparent rounded-full mt-14">add your first contact</button></Link>

              <div className="absolute 2xl:bottom-36 bottom-32 right-0 mr-20 mb-14 flex gap-2 cursor-pointer" onClick={() => logout(navigate, setAuth)}>
                <RiLogoutCircleLine size={30} />
                <p className="text-white " >logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
