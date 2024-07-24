import { Outlet } from "react-router-dom";
import Banner from "../Components/Banners/Banner";

const Layout = () => {
  return (
    <>
      <Banner />
   
      <Outlet />
    </>
  );
};

export default Layout;
