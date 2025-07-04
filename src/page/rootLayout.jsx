import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="outlet">
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
