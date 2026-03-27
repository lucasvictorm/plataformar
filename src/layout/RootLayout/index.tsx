import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ContainerScreen from "../ContainerScreen";

function RootLayout() {
  return (
    <ContainerScreen>
      <Header />

      <Outlet />
    </ContainerScreen>
  );
}

export default RootLayout;
