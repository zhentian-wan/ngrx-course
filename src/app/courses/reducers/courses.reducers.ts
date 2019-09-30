import { Course } from "../model/course";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoursesAction } from "../actions-types";
/*
export interface CoursesState {
  entities: { [key: number]: Course };
  ids: number[];
}*/

export interface CoursesState extends EntityState<Course> {}

export const adapter = createEntityAdapter<Course>();

export const initCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initCoursesState,
  on(CoursesAction.allCoursesLoaded, (state, action) =>
    adapter.addAll(action.courses, state)
  )
);
