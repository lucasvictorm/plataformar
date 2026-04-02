import CourseCard from "../../components/CourseCard";
import type { Course } from "../../types/course";
import CardsGrid from "../CardsGrid";


import {
  sumTotalTimeCourse,
  getTotalCompletedLessons,
  getTotalLessons,
} from "../../utils/course";

type Props = {
  courses: Course[];
  reloadCourses: () => Promise<void>;
};

function HomeScreen({ courses, reloadCourses }: Props) {
  return (
    <>
      <h1 className="text-white p-5 text-3xl font-bold">Seus cursos</h1>

      <CardsGrid>
        {courses.map((course) => {
          const duration = sumTotalTimeCourse(course);
          const completedLessons = getTotalCompletedLessons(course);
          const totalLessons = getTotalLessons(course);

          return (
            <CourseCard
              id={course.id}
              key={course.id}
              title={course.name}
              duration={duration}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
              onDelete={reloadCourses}
            />
          );
        })}
      </CardsGrid>
    </>
  );
}

export default HomeScreen;
