import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fronCourses from "./reducers/courses.reducers";

export const selectCoursesState = createFeatureSelector<
  fronCourses.CoursesState
>("courses");

export const selectAllCourses = createSelector(
  selectCoursesState,
  fronCourses.selectAll
);

export const selectIsLoading = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);
