import CourseCard from "../../components/CourseCard";
import type { Course } from "../../types/course";
import CardsGrid from "../CardsGrid";
import { useNavigate } from "react-router-dom";

import {
  sumTotalTimeCourse,
  getTotalCompletedLessons,
  getTotalLessons,
} from "../../utils/course";

type Props = {
  courses: Course[];
};

function HomeScreen({ courses }: Props) {
  const navigate = useNavigate();

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
              key={course.name}
              title={course.name}
              duration={duration}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
            />
          );
        })}
      </CardsGrid>
    </>
  );
}

export default HomeScreen;
