import ContainerScreen from "./layout/ContainerScreen";
import Header from "./components/Header";

import HomeScreen from "./layout/HomeScreen";

import { courses } from "./data/mockCourses";
import { useState } from "react";
import MainFullContent from "./layout/MainFullContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartScreen from "./layout/StartScreen";
import RootLayout from "./layout/RootLayout";

function App() {
  return (
    <ContainerScreen>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<StartScreen />} />
            <Route path="home" element={<HomeScreen courses={courses} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContainerScreen>
  );
}

export default App;
