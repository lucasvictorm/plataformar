import type { Course } from "../types/course";

export function sumTotalTimeCourse(course: Course): number {
  let totalDuration: number = 0;
  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      totalDuration += lesson.duration ?? 0;
    });
  });

  return totalDuration;
}

export function getTotalCompletedLessons(course: Course): number {
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

export function getTotalLessons(course: Course): number {
  let totalLessons: number = 0;
  course.modules.forEach((module) => {
    module.lessons.forEach(() => {
      totalLessons += 1;
    });
  });

  return totalLessons;
}

export function getPorcCompleted(completed: number, total: number): number {
  return Math.round((completed / total) * 100);
}
