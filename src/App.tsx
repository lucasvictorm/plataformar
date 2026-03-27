import ContainerScreen from "./layout/ContainerScreen";
import Header from "./components/Header";
import CardUpFolder from "./components/CardUpFolder";

import HomeScreen from "./layout/HomeScreen";

import { courses } from "./data/mockCourses";
import { useState } from "react";
import MainFullContent from "./layout/MainFullContent";

function App() {
  const [screen, setScreen] = useState<"start" | "home">("start");

  return (
    <ContainerScreen>
      <Header setScreen={() => setScreen("start")} />
      {screen === "start" && (
        <MainFullContent>
          <CardUpFolder setScreen={() => setScreen("home")} />
        </MainFullContent>
      )}

      {screen === "home" && <HomeScreen courses={courses} />}
    </ContainerScreen>
  );
}

export default App;
