import ContainerScreen from "./layout/ContainerScreen";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import CardUpFolder from "./components/CardUpFolder";

import HomeScreen from "./layout/HomeScreen";

import { courses } from "./data/mockCourses";

function App() {
  return (
    <ContainerScreen>
      <Header />
      <HomeScreen courses={courses} />
      {/*<MainContent>
        <CardUpFolder />
      </MainContent>*/}
    </ContainerScreen>
  );
}

export default App;
