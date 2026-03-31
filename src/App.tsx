import ContainerScreen from "./layout/ContainerScreen";
import Header from "./components/Header";

import HomeScreen from "./layout/HomeScreen";

import { useEffect, useState } from "react";
import MainFullContent from "./layout/MainFullContent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartScreen from "./layout/StartScreen";
import RootLayout from "./layout/RootLayout";
import HomeLayout from "./layout/HomeLayout";
import CourseLayout from "./layout/CourseLayout";
import type { Course } from "./types/course";

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  async function getFullCourses() {
    const courses = await window.db.getCourses();

    for (const course of courses) {
      const modules = await window.db.getModules(course.id);

      for (const module of modules) {
        const lessons = await window.db.getLessons(module.id);
        module.lessons = lessons;
      }

      course.modules = modules;
    }

    return courses;
  }

  useEffect(() => {
    getFullCourses().then((data) => {
      console.log("dados completos:", data);
      setCourses(data);
    });
  }, []);

  console.log(courses);

  return (
    <ContainerScreen>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<StartScreen />} />
            <Route path="/home" element={<HomeLayout courses={courses} />}>
              <Route index element={<HomeScreen courses={courses} />} />
            </Route>
            <Route path="/course/:id" element={<CourseLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContainerScreen>
  );
}

export default App;
