import { Outlet } from "react-router-dom";
import ScrollToTop from "@/shared/ui/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default MainLayout;
