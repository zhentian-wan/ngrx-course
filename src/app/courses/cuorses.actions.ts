import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

export const loadAllCourse = createAction(
  "[Courses Resolver] Load All Courses"
);

export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded",
  props<Course[]>()
);
