import { Course, compareCourses } from "../model/course";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoursesAction } from "../actions-types";
/*
export interface CoursesState {
  entities: { [key: number]: Course };
  ids: number[];
}*/

export interface CoursesState extends EntityState<Course> {
  /**Extend the entity here */
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
  // selectId: course => course.id // NgRx use 'id' by default
});

export const initCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initCoursesState,
  on(CoursesAction.allCoursesLoaded, (state, action) =>
    adapter.addAll(action.courses, { ...state, allCoursesLoaded: true })
  ),

  on(CoursesAction.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
