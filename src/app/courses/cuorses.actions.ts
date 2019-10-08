import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Course } from "./model/course";

export const loadAllCourse = createAction(
  "[Courses Resolver] Load All Courses"
);

export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded",
  props<{ courses: Course[] }>()
);

export const courseUpdated = createAction(
  "[Edit Course Dialog] Course Updated",
  props<{ update: Update<Course> }>()
);
