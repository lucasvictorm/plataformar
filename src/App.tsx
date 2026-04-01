import ContainerScreen from "./layout/ContainerScreen";
import Header from "./components/Header";

import HomeScreen from "./layout/HomeScreen";

import { useEffect, useState } from "react";
import MainFullContent from "./layout/MainFullContent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StartScreen from "./layout/StartScreen";
import RootLayout from "./layout/RootLayout";
import HomeLayout from "./layout/HomeLayout";
import CourseLayout from "./layout/CourseLayout";
import type { Course } from "./types/course";

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  async function loadCourses() {
    const data = await getFullCourses();
    setCourses(data);
  }

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
    loadCourses();
  }, []);

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
            <Route
              path="/"
              element={
                courses.length === 0 ? (
                  <StartScreen />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
            <Route
              path="/home"
              element={
                <HomeLayout reloadCourses={loadCourses} courses={courses} />
              }
            >
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
