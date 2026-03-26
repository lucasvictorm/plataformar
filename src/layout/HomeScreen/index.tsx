import CourseCard from "../../components/CourseCard";
import MainContent from "../../components/MainContent";
import Sidebar from "../../components/Sidebar";
import type { Course } from "../../types/course";
import CardsGrid from "../CardsGrid";

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
      <Sidebar />
      <MainContent>
        <h1 className="text-white p-5 text-3xl">Seus cursos</h1>
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
