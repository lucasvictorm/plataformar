import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ContainerScreen from "../ContainerScreen";

function RootLayout() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
