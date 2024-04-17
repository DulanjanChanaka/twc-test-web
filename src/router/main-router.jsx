import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/mainlayout";
import Home from "../pages/home";
import AddContact from "../pages/addContact";
import Contact from "../pages/contact";
import MainLogin from "../pages/mainLogin";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "contact",
        children: [
          {
            index: true,
            Component: Contact,
          },
          {
            path: "new",
            Component: AddContact,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: MainLogin,
  },
  // {
  //   path: "register",
  //   Component: Register,
  // },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
