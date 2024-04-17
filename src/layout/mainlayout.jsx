import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Mainlayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await localStorage.getItem("twc-auth");
      const data = await JSON.parse(res);
      if (data?.email) {
        setLoading(false);
        setAuth(data);
      } else navigate("/login");
    })();
  }, []);

  // location.pathname

  if (loading) return <div>loading....</div>;

  return (
    <div className="w-full h-screen">
      <Outlet />
    </div>
  );
};

export default Mainlayout;
