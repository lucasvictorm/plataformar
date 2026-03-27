import CourseCard from "../../components/CourseCard";
import MainContent from "../../components/MainContent";
import Sidebar from "../Sidebar";
import type { Course } from "../../types/course";
import CardsGrid from "../CardsGrid";
import CoursePill from "../../components/CoursePill";
import MainButton from "../../components/MainButton";
import { BookOpen, Folder, Plus } from "lucide-react";

type Props = {
  courses: Course[];
};

function sumTotalTimeCourse(course: Course): number {
  let totalDuration: number = 0;
  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      totalDuration += lesson.duration ?? 0;
    });
  });

  return totalDuration;
}

function getTotalCompletedLessons(course: Course): number {
  let finisheds: number = 0;
  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      if (lesson.done) {
        finisheds += 1;
      }
    });
  });

  return finisheds;
}

function getTotalLessons(course: Course): number {
  let totalLessons: number = 0;
  course.modules.forEach((module) => {
    module.lessons.forEach(() => {
      totalLessons += 1;
    });
  });

  return totalLessons;
}

function HomeScreen({ courses }: Props) {
  return (
    <div className="flex flex-1 w-full">
      <Sidebar>
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Lista de cursos
            </h3>
            <MainButton onClick={() => {}}>
              <Plus size={20} color="#90a1b9" />
            </MainButton>
          </div>
          <div className="flex flex-col gap-2">
            {courses.map((course) => {
              let finisheds: number = getTotalCompletedLessons(course);
              let totalLessons = getTotalLessons(course);
              return (
                <CoursePill
                  title={course.name}
                  completedLessons={finisheds}
                  totalLessons={totalLessons}
                />
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-800/30">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Folder className="h-3.5 w-3.5" />
              <span>Total de cursos</span>
            </div>
            <span className="font-semibold text-blue-400">4</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Aulas completas</span>
            </div>
            <span className="font-semibold text-blue-400">16/36</span>
          </div>
        </div>
      </Sidebar>

      <MainContent>
        <h1 className="text-white p-5 text-3xl font-bold">Seus cursos</h1>
        <CardsGrid>
          {courses.map((course) => {
            let totalTime: number = sumTotalTimeCourse(course);
            let finisheds: number = getTotalCompletedLessons(course);
            let totalLessons = getTotalLessons(course);
            return (
              <CourseCard
                title={course.name}
                duration={totalTime}
                completedLessons={finisheds}
                totalLessons={totalLessons}
              />
            );
          })}
        </CardsGrid>
      </MainContent>
    </div>
  );
}

export default HomeScreen;
